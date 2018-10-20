import { http } from './http';
import { ui } from './ui';

//get post from DON load
document.addEventListener("DOMContentLoaded", getPosts);

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

// // listen for edit post
document.querySelector('#posts').addEventListener('click', enableEdit);

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

//delete post
function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if(confirm('Are you sure?')) {
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data => {
                ui.showAlert('Post removed', 'alert alert-success');
                getPosts();
            })
            .catch(err => console.log(err));
        }
    }
    e.preventDefault();
}

//Enable Edit state
function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        
        const data = {
            id, 
            title,
            body
        }

        //fill form with current post
        ui.fillForm(data);
    }
    e.preventDefault();
}
    
