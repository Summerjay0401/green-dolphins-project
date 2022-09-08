const loading = document.getElementById('loading');

function hideLoading() {
  loading.classList.add('loading--hide');
}

function showLoading() {
  loading.classList.remove('loading--hide');
  loading.classList.add('loading--active');
}