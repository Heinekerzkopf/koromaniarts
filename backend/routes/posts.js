const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const parseForm = multer().none(); 

// GET /api/posts
router.get('/', async (_req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка при получении постов' });
  }
});

// POST /api/posts
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'title и description обязательны' });
    }
    const post = await Post.create({
      title, description, authorId: req.user?.id
    });
    res.status(201).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка при создании поста' });
  }
});

// PUT /api/posts/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id, { title, description },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ message: 'Пост не найден' });
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Пост не найден' });
    res.json({ message: 'Пост удалён' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
