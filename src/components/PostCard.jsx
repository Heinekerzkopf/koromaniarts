import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../api/api";
import './postCard.css';
import editIcon from '../img/8666681_edit_icon.svg'
import deleteIcon from '../img/9104213_close_cross_remove_delete_icon.svg'

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
                console.error("User is not authenticated");
                return;
            }

            const response = await axios.delete(`${API_URL}/api/posts/${post._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 200) {
                console.log("Post deleted successfully");
                onDelete(post._id);  // Обновление состояния на главной
            } else {
                console.error("Failed to delete post:", response.status);
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
                        <button className="icon-btn edit-post-btn" onClick={handleEditClick}><img src={editIcon} alt="" /></button>
                        <button className="icon-btn delete-post-btn" onClick={handleDeleteClick}><img src={deleteIcon} alt="" /></button>
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
