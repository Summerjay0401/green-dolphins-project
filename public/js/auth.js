window.addEventListener('DOMContentLoaded', function () {
    function shouldRedirectToHomePage(user, isLoginPage) {
      return user && isLoginPage;
    }
    function shouldRedirectToLoginPage(user, isLoginPage) {
      return !user && !isLoginPage;
    }
    const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
    // check current page is the login page, or not.
    const isLoginPage = window.location.href.includes('login');
    if (shouldRedirectToHomePage(authenticatedUser, isLoginPage)) {
      window.location.href = '/';
    } else if (shouldRedirectToLoginPage(authenticatedUser, isLoginPage)) {
      window.location.href = '/login.html';
    }
  });