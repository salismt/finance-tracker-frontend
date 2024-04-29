// nav.js
import {user} from './auth.js';

class Navbar {
  constructor() {
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
                    </a>
                    <a href="/profile" class="nav-item">
                        <img src="../icons/user.png" alt="Profile" class="nav-icon"/>
                    </a>
                    <a href="/transactions" class="nav-item">
                        <img src="../icons/file.png" alt="Transactions" class="nav-icon"/>
                    </a>
                    <a href="#" onclick="this.onLogout(); return false;" class="nav-item">
                        <img src="../icons/logout.png" alt="Logout" class="nav-icon"/>
                    </a>
                    <a href="/add-transaction" id="add-transaction-btn" class="nav-item">
                        <img src="../icons/plus.png" alt="Transactions" class="nav-icon"/>
                    </a>
                </nav>
            `;

      // Attach event listeners to dynamic elements
    } else {
      this.nav.innerHTML = `
                <nav class="vertical-navbar">
                    <a href="/login" class="nav-item">
                        <img src="../icons/login.png" alt="Login" class="nav-icon"/>
                    </a>
                    <a href="/signup" class="nav-item">
                        <img src="../icons/signup.png" alt="Signup" class="nav-icon"/>
                    </a>
                </nav>

            `;
    }
  }

  onLogout() {
    this.setupNavbar();
  }
}

export default Navbar;

