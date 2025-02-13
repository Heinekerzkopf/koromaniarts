const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');  // Модель для изображения
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Настройка storage для multer (где хранить файлы и как их называть)
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

// Инициализация multer
const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 }  });

// Защищённый маршрут для загрузки изображений
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Не выбрано изображение' });
    }

    const { title, description } = req.body;

    const newImage = new Image({
      title,
      description,
      imageUrl: `/uploads/${req.file.filename}`
    });

    await newImage.save();

    res.status(201).json({ message: 'Изображение загружено успешно!', image: newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при загрузке изображения' });
  }
});

module.exports = router;
