import React, { useState, useMemo } from 'react';
import axios from 'axios';
import API_URL from "../api/api";
import './newPost.css';

const NewPost = ({ onCreated }) => {
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isLoggedIn = Boolean(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const t = title.trim();
    const d = description.trim();

    if (!t || !d) {
      setError('Post title and description can not be empty');
      return;
    }

    if (!token) {
      setError('Please enter the system');
      return;
    }

    try {
      setLoading(true);

      // ШЛЁМ JSON (axios сам поставит Content-Type: application/json)
      const res = await axios.post(
        `${API_URL}/api/posts`,
        { title: t, description: d },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLoading(false);
      setSuccess(true);
      setTitle('');
      setDescription('');
      onCreated && onCreated();

      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setLoading(false);
      // попробуем показать текст с сервера, если есть
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Hm... looks like some error. Try again, please';
      setError(msg);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="post-upload-form">
      <h2>New post</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-div'>
          <label htmlFor="post-title">Title</label>
          <input
            type="text"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            required
          />
        </div>

        <div className='form-div'>
          <label htmlFor="post-description">What's new?</label>
          <textarea
            id="post-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={5000}
            required
          />
        </div>

        <button className='post-button' type="submit" disabled={loading}>
          {loading ? 'Posting…' : 'Add new post'}
        </button>

        {success && <div style={{ color: 'green' }}>New post was added!</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default NewPost;
