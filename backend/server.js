const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Image = require('./models/Image');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const corsOrigin = process.env.NODE_ENV === 'production'
    ? process.env.CORS_ORIGIN_PROD
    : process.env.CORS_ORIGIN_DEV;

// DB connection
connectDB();

// CORS settings
app.use(cors({
    origin: corsOrigin,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Для парсинга JSON

// Настройка Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Настройка хранилища Multer для Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'gallery_uploads', // Папка в Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
    }
});

const upload = multer({ storage });

// Маршрут загрузки изображений
// app.post('/api/upload', upload.array('images', 5), async (req, res) => {
//     try {
//         const imageUrls = req.files.map(file => file.path); // Получаем ссылки на загруженные изображения
//         const { title, description } = req.body;

//         const image = new Image({
//             title, 
//             description, 
//             imageUrls
//         });

//         await image.save(); // Сохраняем в базе данных
//         res.json({ message: 'Изображения успешно загружены', imageUrls });
//     } catch (error) {
//         console.error('Ошибка при загрузке изображений:', error);
//         res.status(500).json({ message: 'Ошибка при загрузке изображений' });
//     }
// });

app.post('/api/upload', authMiddleware, upload.array('images', 5), async (req, res) => {
    try {
        const { title = '', description = '', availability } = req.body;

        if (!title.trim() || !description.trim()) {
            return res.status(400).json({ message: 'title a description jsou povinné' });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Nahrajte alespoň jeden obrázek' });
        }

        const allowed = ['AVAILABLE', 'NOT_AVAILABLE'];
        const finalAvailability = allowed.includes(availability) ? availability : 'AVAILABLE';

        const imageUrls = req.files.map(f => f.path.replace(/\\/g, '/'));

        const image = new Image({
            title: title.trim(),
            description: description.trim(),
            imageUrls,
            availability: finalAvailability
        });

        await image.save();

        return res.status(201).json({
            message: 'Obrázky úspěšně nahrány',
            image
        });
    } catch (error) {
        console.error('Chyba při uploadu:', error);
        return res.status(500).json({ message: 'Chyba při uploadu' });
    }
});



// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', require('./routes/images'));
app.use('/api/posts', require('./routes/posts'));

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
