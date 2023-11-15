// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Paper, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Box } from '@mui/system';

const pagination = {
    margin: "10px",
}

const PostList = ({ page, setPage, posts }) => {
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
                setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    // Handle post click and navigate to SinglePost page
    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    return (
        <Box sx={{ m: 5, width: '100%', bgcolor: 'background.paper' }}>
            <Paper elevation={3}>
                <Typography variant="h4" sx={{ p: 2 }} gutterBottom>
                    Posts List
                </Typography>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ paddingBottom: "10px" }}>
                        <List>
                            {posts.map(post => (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        key={post.id}
                                        onClick={() => handlePostClick(post.id)}>
                                        <ListItemText primary={post.title} secondary={post.body} />

                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Pagination
                            variant="outlined" color="secondary"
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            style={pagination}
                        />
                    </div>
                )}
            </Paper>
        </Box >
    );
};

export default PostList;
