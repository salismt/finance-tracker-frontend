// nav.js
import {user} from './auth.js';
import { TransactionModal } from './modal.js'; // Make sure to import the modal

const transactionModal = new TransactionModal(); // Instantiate the modal

function updateNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  if (user.isAuthenticated) {
    nav.innerHTML = `
            <nav class="vertical-navbar">
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
                <a href="#" onclick="onLogout(); return false;" class="nav-item">
                    <img src="../icons/logout.png" alt="Logout" class="nav-icon"/>
                    <span>Logout</span>
                </a>
                <button id="add-transaction-btn" class="nav-item">
                    <img src="../icons/plus.png" alt="Add Transaction" class="nav-icon"/>
                    <span>Add Transaction</span>
                </button>
            </nav>
        `;

    // Attach event listeners to dynamic elements
    document.getElementById('add-transaction-btn').addEventListener('click', transactionModal.open);
  } else {
    nav.innerHTML = `
            <nav class="vertical-navbar">
                <a href="/login" class="nav-item">
                    <img src="../icons/door.png" alt="Login" class="nav-icon"/>
                    <span>Login</span>
                </a>
            </nav>
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
