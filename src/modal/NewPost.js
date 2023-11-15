// src/components/PostForm.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';



const PostForm = ({ addPost }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost({ title, body });
        setTitle('');
        setBody('');
        handleClose();
    };

    const buttonStyle = {
        color: 'white',
        borderColor: 'white',
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen} style={buttonStyle}>
                Add New Post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the details below to create a new post.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextField
                            label="Body"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                        <DialogActions>
                            <Button type="submit" color="primary">
                                Add Post
                            </Button>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PostForm;
