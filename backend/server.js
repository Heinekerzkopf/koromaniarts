const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const path = require('path');
const multer = require('multer');
const Image = require('./models/Image'); 
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
    origin: corsOrigin, // Разрешаем запросы с фронтенда
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Для парсинга JSON

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/images', require('./routes/images'));

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.array('images', 5), async (req, res) => {
    try {
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        const { title, description } = req.body;

        const image = new Image({
            title, 
            description, 
            imageUrls
        });
        
        await image.save(); // Сохраняем в базе данных
        res.json({ message: 'Изображения успешно загружены', imageUrls });
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
        res.status(500).json({ message: 'Ошибка при загрузке изображений' });
    }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
