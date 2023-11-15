// src/App.js
import './App.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Container } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from '@mui/material/Badge';
import SinglePost from './component/SinglePost';
import PostList from './component/PostList';
import Favorites from './component/Favorites';
import PostForm from './modal/NewPost';
import axios from 'axios';

const toolbarContainer = {
  display: 'flex',
  justifyContent: 'space-between',
}

const title = {
  textDecoration: 'none',
  color: 'inherit'
}

const rightSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
}

const favStyle = {
  color: "red",
  white: {
    color: "#fff"
  },
}

const App = () => {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch posts from the API
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, [page]);

  const addToFavorites = (post) => {
    console.log(post)
    const newFavorites = [...favorites, post];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (postId) => {
    const updatedFavorites = favorites.filter((post) => post.id !== parseInt(postId, 10));
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const addPostToList = async (post) => {
    try {
      // Simulate adding post to server (replace with actual API call)
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
      const newPost = response.data;

      // Update the local state
      setPosts([newPost, ...posts]);
      console.log(newPost)

    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar style={toolbarContainer}>
            <Link to="/" style={title}>
              <Typography variant="h6">Simple Blog</Typography>
            </Link>
            <div style={rightSection}>

              <Link to="/" style={title}>
                <Typography variant="h6">Post List</Typography>
              </Link>
              <Link to="/favorites">
                <IconButton color="inherit">
                  <Badge badgeContent={favorites.length} color="secondary" showZero>
                    <FavoriteIcon style={favStyle} />
                  </Badge>
                </IconButton>
              </Link>

              <PostForm addPost={(post) => addPostToList(post)} />
            </div>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/posts/:postId" element={<SinglePost addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
            <Route
              path="/"
              element={<PostList page={page} setPage={setPage} posts={posts} loading={loading} />}
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
