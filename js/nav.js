// nav.js
import {user} from './auth.js';
import { TransactionModal } from './modal.js'; // Make sure to import the modal

const transactionModal = new TransactionModal(); // Instantiate the modal

function updateNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  if (user.isAuthenticated) {
    nav.innerHTML = `
<nav id="nav" class="vertical-navbar">
    <!-- Each nav item has an icon and text -->
    <a href="/" class="nav-item">
      <img src="../icons/home.png" alt="Home" class="nav-icon"/>
      <span>Home</span>
    </a>

    <a href="/profile" class="nav-item">
      <img src="../icons/user.png" alt="Profile" class="nav-icon"/>
      <span>Profile</span>
    </a>

    <a href="/transactions" class="nav-item">
      <img src="../icons/file.png" alt="Transactions" class="nav-icon"/>
      <span>Transactions</span>
    </a>

    <a href="#" onclick="onLogout(); return false;">Logout</a>

                <button id="add-transaction-btn" class="nav-item">+</button>


    <!-- Other nav items... -->
  </nav>
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
<a href="/" class="nav-item">
      <img src="../icons/home.png" alt="Home" class="nav-icon"/>
      <span>Home</span>
    </a>
    <a href="/login" class="nav-item">
      <img src="../icons/door.png" alt="Door" class="nav-icon"/>
      <span>Login</span>
    </a>
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
