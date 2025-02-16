const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');  // Модель для изображений
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Настройка storage для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для хранения изображений
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Генерируем уникальное имя для файла
  }
});

// Проверка типа файла
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неправильный формат файла. Поддерживаются только изображения.'));
  }
};

// Инициализация multer для загрузки до 5 файлов
const upload = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } });

// Защищённый маршрут для загрузки изображений (до 5 файлов)
router.post('/', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Не выбрано изображение' });
    }

    const { title, description } = req.body;
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`); // Создаём массив путей

    const newImage = new Image({
      title,
      description,
      imageUrls // Сохраняем массив путей вместо одного imageUrl
    });

    await newImage.save();

    res.status(201).json({ message: 'Изображения загружены успешно!', image: newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при загрузке изображений' });
  }
});

module.exports = router;
