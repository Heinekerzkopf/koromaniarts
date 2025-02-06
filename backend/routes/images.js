const express = require('express');
const Image = require('../models/Image');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Получение всех изображений
router.get('/', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении изображений' });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = await Image.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        res.json(image);
    } catch (error) {
        console.error('Ошибка при редактировании:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
