const express = require('express');
const Image = require('../models/Image');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Получение всех изображений
router.get('/', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images); // Отправляем все изображения, включая массив imageUrls
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении изображений' });
    }
});

// Обновление изображения
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = await Image.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        if (!image) {
            return res.status(404).json({ message: 'Изображение не найдено' });
        }

        res.json(image);  // Отправляем обновленное изображение
    } catch (error) {
        console.error('Ошибка при редактировании:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Удаление изображения
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findOneAndDelete({ _id: id });
        if (!image) {
            return res.status(404).json({ message: 'Изображение не найдено' });
        }
        res.json({ message: 'Изображение успешно удалено' });
    } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


module.exports = router;
