import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../api/api";
import './postCard.css';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const PostCard = ({ post, onEditClick, onDelete }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEditClick(post);
    };

    const handleDeleteClick = async (e) => {
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const response = await axios.delete(`${API_URL}/api/posts/${post._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 200) {
                onDelete(post._id);  
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="post-card">
            <div className='post-title-content'>
                <h3>{post.title}</h3>
                {isLoggedIn && (
                    <div className='post-actions'>
                        <button className="icon-btn edit-post-btn" onClick={handleEditClick}>
                            <FaRegEdit />
                        </button>
                        <button className="icon-btn delete-post-btn" onClick={handleDeleteClick}>
                            <FaRegTrashAlt />
                        </button>
                    </div>
                )}
            </div>
            <p>{post.description}</p>
            <time className="post-date">
                {new Date(post.createdAt).toLocaleDateString('cs-CZ')}
            </time>
        </div>
    );
};

export default PostCard;