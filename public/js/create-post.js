/* eslint-disable no-unused-vars */

const postFileUpload = document.getElementById('post-file');
const preview = document.getElementById('image-upload-preview');
const fileUploadSection = document.getElementById('file-upload-section');
const caption = document.getElementById('caption');

const clearModal = (hide) => {
    preview.src = '';
    preview.classList.add('is-hidden');
    fileUploadSection.classList.remove('is-hidden');
    caption.value = '';
    postFileUpload.value = '';
};

// Function to open the modal
function openModal() {
    clearModal();
    // Add is-active class on the modal
    document.getElementById('create-post').classList.add('is-active');
}

// Function to close the modal
function closeModal() {
    clearModal();
    document.getElementById('create-post').classList.remove('is-active');
}

postFileUpload.onchange = () => {
    let input = postFileUpload.files[0];
    console.log(input);
    preview.src = URL.createObjectURL(input);
    preview.classList.remove('is-hidden');

    fileUploadSection.classList.add('is-hidden');
};

const sharePost = document.getElementById('share-post');
sharePost.onclick = () => {
    alert('shared!');
};