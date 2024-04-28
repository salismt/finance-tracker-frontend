// app.js
import { fetchCategories, fetchTransactions } from './api.js';
import { onLoginSuccess, onSignupSuccess, user, onLogout } from './auth.js';
import Navbar from './nav.js';
import { renderDashboard } from './dashboard.js';
import { TransactionModal } from './modal.js';
import config from './config.js';

document.addEventListener('DOMContentLoaded', function() {
  var base = document.createElement('base');
  base.href = window.location.hostname === 'localhost' ? '/' : '/finance-tracker-frontend/';
  document.head.prepend(base);
  const transactionModal = new TransactionModal(); // Instantiate the modal
  const navbar = new Navbar(transactionModal);

  page('/', index);
  page('/categories', categories);
  page('/transactions', transactions);
  page('/login', login);
  page('/signup', signup);
  page('/profile', profile);
  // page('/logout', onLogout(navbar))
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
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Login</button>
    </form>
    <div id="login-error"></div>
  `;
  document.getElementById('login-form').addEventListener('submit', onLoginSuccess)
}

function signup() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Sign Up</h1>
    <form id="signup-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <button type="submit">Sign Up</button>
    </form>
    <div id="signup-error"></div>
  `;
  document.getElementById('signup-form').addEventListener('submit', onSignupSuccess)
}

function profile() {
  if (!user.isAuthenticated) {
    page.redirect(`${config.URL_PREFIX}login`); // Redirect to login if not authenticated
    return;
  }

  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="profile-container">
      <h2 class="profile-title">Profile</h2>
      <div class="profile-info">
        <!-- <img src="avatar.png" alt="Profile Image" class="profile-image"> -->
        <p class="profile-name">${user.name}</p>
        <p class="profile-email">${user.email}</p>
      </div>
      <div class="balance-info">
        <h3>Balance</h3>
        <p class="balance-amount">$<span id="profile-balance">220</span></p>
      </div>
    </div>
  `;
}
