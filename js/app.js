// app.js
import {fetchBalance, fetchCategories, fetchTransactions} from './api.js';
import { onLoginSuccess, onSignupSuccess, user, onLogout } from './auth.js';
import Navbar from './nav.js';
import { renderDashboard } from './dashboard.js';
import { onAddTransaction } from "./transaction.js";
import config from './config.js';

document.addEventListener('DOMContentLoaded', function() {
  var base = document.createElement('base');
  base.href = config.URL_PREFIX;
  document.head.prepend(base);
  const navbar = new Navbar();

  page('/', index);
  page('/categories', categories);
  page('/transactions', transactions);
  page('/add-transaction', addTransaction)
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

  fetchCategories().then(categoryData => {
    const list = categoryData.categories.map(cat => `<li>${cat.name}</li>`).join('');
    app.innerHTML = `<h1>Categories</h1><ul>${list}</ul>`;
  });
}

function transactions() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="transactions-page">
      <div class="transaction-filters">
        <h1 class="page-title">Statement</h1>
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

  fetchTransactions().then(transactionData => {
    const transactionsList = document.getElementById('transactions-list');
    transactionsList.innerHTML = transactionData.transactions.map(trx => `
        <div class="transaction-item">
          <span class="transaction-description">${trx.name}</span>
          <span class="transaction-date">${new Date(trx.date).toLocaleDateString()}</span>
          <span class="transaction-category">${trx.category}</span>
          <span class="transaction-amount">$${trx.amount}</span>
        </div>
      `).join('');

  });
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
        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/man-avatar.png" alt="Profile Image" class="profile-image">
        <p class="profile-name">${user.name}</p>
        <p class="profile-email">${user.email}</p>
      </div>
      <div class="balance-info">
        <h3>Balance ina</h3>
        <p class="balance-amount">$<span id="profile-balance">0</span></p>
      </div>
    </div>
  `;
  fetchBalance().then(balanceData => {
    const balance = document.getElementById('profile-balance');
    balance.textContent = balanceData.current_balance;
  })
  document.getElementById('profile-balance').innerHTML = "79999";
}

function addTransaction() {
  if (!user.isAuthenticated) {
    page.redirect(`${config.URL_PREFIX}login`); // Redirect to login if not authenticated
    return;
  }
  const app = document.getElementById('app');
  app.innerHTML = `
  <div class="modal-like-container">
  <div class="modal-content">
    <h2>Input Transaction</h2>
    <form id="transaction-form">
      <div class="form-group">
        <label for="transaction-name">Transaction Name</label>
        <input type="text" id="transaction-name" name="transaction-name" required>
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" name="category">
          <!-- Categories options will be populated dynamically -->
        </select>
      </div>

      <div class="form-group">
        <label for="transaction-date">Date of Transaction</label>
        <input type="date" id="transaction-date" name="transaction-date" required>
      </div>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input type="number" id="amount" name="amount" step="0.01" required>
      </div>

      <div class="form-group">
        <label for="type">Type</label>
        <select id="type" name="type">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <button type="submit" onclick="">Submit</button>
    </form>
  </div>
</div>
`;

  fetchCategories().then(categoryData => {
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';  // Clear existing options first, if any

    categoryData.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.key; // Ensure your backend sends `id` or adjust as needed
      option.textContent = category.key;
      categorySelect.appendChild(option);
    });
  });
  document.getElementById('transaction-form').addEventListener('submit', onAddTransaction)

}

