const express = require('express');
const Image = require('../models/Image');

const router = express.Router();

// Получение всех изображений
router.get('/', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении изображений' });
    }
});

module.exports = router;
