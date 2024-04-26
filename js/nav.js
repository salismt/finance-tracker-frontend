// nav.js
import {user} from './auth.js';
import page from 'page';
import { TransactionModal } from './modal.js'; // Make sure to import the modal

const transactionModal = new TransactionModal(); // Instantiate the modal

function updateNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  if (user.isAuthenticated) {
    nav.innerHTML = `
            <a href="/">Home</a>
            <a href="/categories">Categories</a>
            <a href="/transactions">Transactions</a>
            <a href="/profile">Profile</a>
            <a href="#" onclick="onLogout(); return false;">Logout</a>
            <button id="add-transaction-btn">+</button>

        `;
    document.getElementById('add-transaction-btn').addEventListener('click', transactionModal.open);
    if (user.isAuthenticated) {
      document.getElementById('logout-link').addEventListener('click', (event) => {
        event.preventDefault();
        onLogout(); // Call the logout function from auth.js
      });
    }
  } else {
    nav.innerHTML = `
            <a href="/">Home</a>
            <a href="/login">Login</a>
        `;
  }
}

export function setupNavbar() {
  updateNavbar();
  user.onAuthChange = updateNavbar; // Assuming User class has an observer for auth changes
}

export function onLogout() {
  user.logout();
  updateNavbar();
  page.redirect('/login');
}
