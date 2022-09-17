const likeButtons = document.getElementsByClassName('.card-like');

likeButtons.forEach(like => {
    like.addEventListener('click', function handleClick(event) {
      console.log('box clicked', event);
      like.setAttribute('style', 'background-color: yellow;');
    });
});

