// nav.js
import { user } from './auth.js';
import page from 'page';

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
        `;
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
