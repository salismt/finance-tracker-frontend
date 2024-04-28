// nav.js
import {user} from './auth.js';

class Navbar {
  constructor(transactionModal) {
    this.transactionModal = transactionModal;
    this.nav = document.getElementById('nav');
    this.setupNavbar();
    user.onAuthChange = this.setupNavbar.bind(this); // Ensure the right context is maintained
  }

  setupNavbar() {
    if (!this.nav) return;

    if (user.isAuthenticated) {
      this.nav.innerHTML = `
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
                    <a href="#" onclick="this.onLogout(); return false;" class="nav-item">
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
      document.getElementById('add-transaction-btn').addEventListener('click', () => this.transactionModal.open());
    } else {
      this.nav.innerHTML = `
                <nav class="vertical-navbar">
                    <a href="/login" class="nav-item">
                        <img src="../icons/door.png" alt="Login" class="nav-icon"/>
                        <span>Login</span>
                    </a>
                </nav>
            `;
    }
  }

  onLogout() {
    user.logout();
    this.setupNavbar();
    window.location.href = '/login';
  }
}

export default Navbar;

