// src/components/SinglePost.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Typography, Button, Card, CardContent, CardActions, IconButton, CardMedia } from '@mui/material';

const SinglePost = ({ addToFavorites, removeFromFavorites }) => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                setPost(response.data);

                // Check if post is already in favorites on component mount
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                setIsFavorite(favorites.some((favorite) => favorite.id === parseInt(postId, 10)));
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);


    const handleAddToFavorites = () => {
        addToFavorites(post);
        setIsFavorite(true);
    };

    const handleRemoveFromFavorites = () => {
        removeFromFavorites(postId);
        setIsFavorite(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return (
            <div>
                <p>Post not found. Return to the <Link to="/">post list</Link>.</p>
            </div>
        );
    }

    const cardStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
    }

    return (

        <div style={cardStyle}>
            <Card sx={{ maxWidth: 500 }}>

                <CardMedia
                    component="img"
                    height="194"
                    image={`https://source.unsplash.com/collection/928423/1280x720?${Math.random()}`}
                    alt="Random"
                />
                <CardContent>
                    <Typography variant="h4">{post.title}</Typography>
                    <Typography variant="h6">{post.body}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="outlined" onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}>
                        <IconButton color="primary">
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Typography>
                    </Button>
                </CardActions>

            </Card>
        </div>


    );
};

export default SinglePost;
