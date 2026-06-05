import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import './blog.css'
import NewPost from '../components/NewPost'
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import EditModal from '../components/EditModal';
import { getPosts } from '../api/api';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getPosts();
            setPosts(response.data);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (image) => {
        setSelectedPost(image);
        setIsEditing(false);
    };

    const openEditModal = (image) => {
        setSelectedPost(image);
        setIsEditing(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    // Error deleting post
    const handleDelete = async (id) => {
        setPosts(posts.filter(post => post._id !== id));
    };

    return (
        <div className="blog-container">
            <Helmet>
                <title>Blog a Novinky | Koroman Arts</title>
                <meta name="description" content="Přečtěte si novinky a informace o mých výstavách." />
            </Helmet>
            <h2>Zde naleznete informace o mých výstavách a dalších aktivitách</h2>
            <div className="blog-new-post">
                <NewPost onCreated={fetchPosts} />
            </div>
            <div className="blog-content">
                {loading && (
                    <div className="loading-indicator">
                        <div className="circle"></div>
                    </div>
                )}
                <div className="posts">
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onClick={openModal}
                            onEditClick={openEditModal}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {selectedPost && !isEditing && (
                    <Modal image={selectedPost} onClose={closeModal} />
                )}

                {selectedPost && isEditing && (
                    <EditModal
                        image={selectedPost}
                        onClose={closeModal}
                        onUpdate={fetchPosts}
                    />
                )}
            </div>
        </div>
    )
}

export default Blog