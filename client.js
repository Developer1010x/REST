const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');







const apiUrl = 'http://localhost:3000/posts';

function getPosts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(posts => displayPosts(posts))
        .catch(error => console.error('Error fetching posts:', error));
}


function displayPosts(posts) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<h3>${post.title}</h3>
                             <p>${post.body}</p>
                             <button onclick="deletePost(${post.id})">Delete</button>
                             <button onclick="editPost(${post.id}, '${post.title}', '${post.body}')">Edit</button>
                             <button onclick="updatePost(${post.id})">Update</button>`;
        outputDiv.appendChild(postDiv);
    });
}

function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;

    axios.post(apiUrl, { title, body })
        .then(() => {
            getPosts();
            document.getElementById('postForm').reset();
        })
        .catch(error => console.error('Error creating post:', error));
}

function deletePost(postId) {
    axios.delete(`${apiUrl}/${postId}`)
        .then(() => getPosts())
        .catch(error => console.error('Error deleting post:', error));
}

function editPost(postId, currentTitle, currentBody) {
    const newTitle = prompt('Enter new title:', currentTitle);
    const newBody = prompt('Enter new body:', currentBody);

    if (newTitle !== null && newBody !== null) {
        axios.put(`${apiUrl}/${postId}`, { title: newTitle, body: newBody })
            .then(() => getPosts())
            .catch(error => console.error('Error updating post:', error));
    }
}

function updatePost(postId) {
    const updatedTitle = prompt('Enter updated title:');
    const updatedBody = prompt('Enter updated body:');

    if (updatedTitle !== null && updatedBody !== null) {
        axios.put(`${apiUrl}/${postId}`, { title: updatedTitle, body: updatedBody })
            .then(() => getPosts())
            .catch(error => console.error('Error updating post:', error));
    }
}

// Initial fetch of posts
getPosts();