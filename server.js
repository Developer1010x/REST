const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Sample in-memory data
let posts = [
    { id: 1, title: 'First Post', body: 'This is the body of the first post.' },
    { id: 2, title: 'Second Post', body: 'This is the body of the second post.' },
];

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Create a new post
app.post('/posts', (req, res) => {
    const { title, body } = req.body;
    const newPost = { id: posts.length + 1, title, body };
    posts.push(newPost);
    res.json(newPost);
});

// Update a post
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, body } = req.body;
    const index = posts.findIndex(post => post.id === postId);

    if (index !== -1) {
        posts[index] = { id: postId, title, body };
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(post => post.id === postId);

    if (index !== -1) {
        posts.splice(index, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});