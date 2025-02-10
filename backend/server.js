const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// DB connection
connectDB();

// CORS settings
app.use(cors({
    origin: 'http://localhost:3000', // Разрешаем запросы с фронтенда
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

app.post('/api/upload', upload.single('image'), (req, res) => {
    // Логика для работы с изображением
    console.log(req.file); // Выведет данные о загруженном файле
    res.send('Файл успешно загружен');
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
