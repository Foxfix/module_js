import { http } from './http';
import { ui } from './ui';

//get post from DON load
document.addEventListener("DOMContentLoaded", getPosts);

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

function getPosts() {
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//add post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
        title,
        body
    }

    //create post
    http.post('http://localhost:3000/posts', data)
    .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearField();
        getPosts();
    })
    .catch(err => console.log(err));
    
}