function showCookieBanner() {
  if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-banner').style.display = 'block';
  }
}

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  document.getElementById('cookie-banner').style.display = 'none';
}

function declineCookies() {
  document.getElementById('cookie-banner').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', showCookieBanner);
