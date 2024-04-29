// nav.js
import {user} from './auth.js';
import config from './config.js';
import app from './app.js';

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
                    <a href="${config.URL_PREFIX}" class="nav-item">
                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/home.png" alt="Home" class="nav-icon"/>
                    </a>
                    <a href="${config.URL_PREFIX}profile" class="nav-item">
                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/user.png" alt="Profile" class="nav-icon"/>
                    </a>
                    <a href="${config.URL_PREFIX}transactions" class="nav-item">
                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/file.png" alt="Transactions" class="nav-icon"/>
                    </a>
                    <a href="${config.URL_PREFIX}add-transaction" id="add-transaction-btn" class="nav-item">
                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/plus.png" alt="Transactions" class="nav-icon"/>
                    </a>
                </nav>
            `;

      // Attach event listeners to dynamic elements
    } else {
      this.nav.innerHTML = `
                <nav class="vertical-navbar">
                    <a href="${config.URL_PREFIX}login" class="nav-item">
                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/login.png" alt="Login" class="nav-icon"/>
                    </a>
                    <a href="${config.URL_PREFIX}signup" class="nav-item">
                        <img src="https://storage.googleapis.com/finance-tracker-img-bucket/signup.png" alt="Signup" class="nav-icon"/>
                    </a>
                </nav>

            `;
    }
  }
}

export default Navbar;

