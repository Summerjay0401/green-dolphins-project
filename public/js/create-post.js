/* eslint-disable no-unused-vars */

const preview = document.getElementById('image-upload-preview');
const caption = document.getElementById('caption');

const clearModal = (hide) => {
    preview.src = '';
    preview.classList.add('is-hidden');
    caption.value = '';
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


let postFileUpload = document.getElementById('post-file');
postFileUpload.onchange = () => {
    let input = postFileUpload.files[0];

    const preview = document.getElementById('image-upload-preview');
    preview.src = URL.createObjectURL(input);
    preview.classList.remove('is-hidden');
};