// app.js
import { fetchCategories, fetchTransactions } from './api.js';
import { onLoginSuccess, onLoginFailure, handleGoogleCallback, user, onLogout } from './auth.js';
import { setupNavbar } from './nav.js';
import { renderDashboard } from './dashboard.js';
import { TransactionModal } from './modal.js';
import page from 'page';



document.addEventListener('DOMContentLoaded', function() {
  var base = document.createElement('base');
  base.href = window.location.hostname === 'localhost' ? '/' : '/finance-tracker-frontend/';
  document.head.prepend(base);

  setupNavbar(); // Initialize the navbar when the DOM is ready
  page('/', index);
  page('/categories', categories);
  page('/transactions', transactions);
  page('/login', login);
  page('/auth/google/callback', googleAuthCallback)
  page('/profile', profile);
  page();
});

function index() {
  if (user.isAuthenticated) {
    renderDashboard();
  } else {
    const app = document.getElementById('app');
    app.innerHTML = '<h1>Home Page</h1><p>Welcome to our finance tracker.</p>';
  }
}

function categories() {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Categories</h1><div>Loading categories...</div>';

  fetchCategories().then(categories => {
    const list = categories.map(cat => `<li>${cat.name}</li>`).join('');
    app.innerHTML = `<h1>Categories</h1><ul>${list}</ul>`;
  });
}

function transactions() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="transactions-page">
      <h1 class="page-title">Statement</h1>
      <div class="transaction-filters">
        <input type="search" placeholder="Search" class="transaction-search" />
        <select class="time-frame-select">
          <option value="1">1 Month</option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">1 Year</option>
        </select>
      </div>
      <div id="transactions-list" class="transactions-list">
        <!-- Transactions will be dynamically inserted here -->
      </div>
    </div>
  `;

  fetchTransactions();
}

function login() {
  const app = document.getElementById('app');
  app.innerHTML = `
        <h1>Login</h1>
        <div id="login-button"></div> <!-- Google Sign-In button -->
        <div id="login-error"></div>
    `;

  gapi.signin2.render('login-button', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onLoginSuccess,
    'onfailure': onLoginFailure
  });
}

function profile() {
  if (!user.isAuthenticated) {
    page.redirect(`${process.env.URL_PREFIX}login`); // Redirect to login if not authenticated
    return;
  }

  const userProfile = user.fetchProfileData();
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="profile-container">
      <h2 class="profile-title">Profile</h2>
      <div class="profile-info">
        <img src="${userProfile.getImageUrl()}" alt="Profile Image" class="profile-image">
        <p class="profile-name">${userProfile.getName()}</p>
        <p class="profile-email">${userProfile.getEmail()}</p>
      </div>
      <div class="balance-info">
        <h3>Balance</h3>
        <p class="balance-amount">$<span id="profile-balance">220</span></p>
      </div>
    </div>
  `;
}

function googleAuthCallback(context) {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  if (code) {
    handleGoogleCallback(code);
  } else {
    console.error('Google callback did not include an authorization code');
    page.redirect(`${process.env.URL_PREFIX}login`)
  }
}
