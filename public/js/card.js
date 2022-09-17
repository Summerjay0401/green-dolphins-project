const comments = document.getElementsByClassName('input-comment');
const likeButtons = document.getElementsByClassName('card-like');

const likeAsync = async (data) => {
    const response = await fetch('/api/like', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });

    return response;
};

const unlikeAsync = async (data) => {
    const response = await fetch('/api/unlike', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });

    return response;
};

const commentAsync = async (data) => {
    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });

    return response;
};

for (let i = 0; i < likeButtons.length; i++){
    const like = likeButtons[i];
    like.addEventListener('click', async function handleClick(e) {
        e.preventDefault();

        const data = {
            post_id: like.dataset.postid,
            user_id: document.getElementById('user_id').value
        };

        const cardContent = like.closest('.card-content');
        const likeCount = cardContent.querySelector('.like-count');

        let response = null;

        if (like.classList.contains('is-like')) {
            response = await unlikeAsync(data);

            if (response.ok) {
                like.classList.remove('is-like');

                let count = parseInt(likeCount.dataset.likes) - 1;
                likeCount.dataset.likes = count;
                likeCount.textContent = `${count} Likes`;
            }
        } else {
            response = await likeAsync(data);

            if (response.ok) {
                like.classList.add('is-like');

                let count = parseInt(likeCount.dataset.likes) + 1;
                likeCount.dataset.likes = count;
                likeCount.textContent = `${count} Likes`;
            }
        }

    });
}

for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    comment.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const response = await commentAsync({
                post_id: comment.dataset.postid,
                user_id: document.getElementById('user_id').value,
                content: comment.value
            });

            if (response.ok) {
                comment.value = '';
            }
        }
    });

}
