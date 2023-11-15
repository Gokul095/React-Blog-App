// src/components/Favorites.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


const listItemStyle = {
    textDecoration: 'none',
    color: 'inherit',
};

// const listItemText = {
//     fontSize: '16px',
// };


const Favorites = ({ favorites, removeFromFavorites }) => {
    return (
        <div >
            <Typography variant="h6" sx={{ paddingTop: 5 }}>Favorites</Typography>
            <Typography variant="h4">Number of favorite posts: {favorites.length}</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: 3, marginBottom: 3 }}>
                {favorites.map(post => (
                    <Grid xs={6} key={post.id}>
                        <Link to={`/posts/${post.id}`} style={listItemStyle}>
                            <Card>

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

                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Favorites;
