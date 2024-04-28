export default class User {
  constructor() {
    this.onAuthChange = null;
    this.load();
  }

  loginWithPassport(token, user) {
    this.isAuthenticated = true;
    this.token = token;
    this.name = user.name;
    this.email = user.email;
    this.save();
    this.notifyAuthChange();
  }

  logout() {
    this.isAuthenticated = false;
    this.name = null;
    this.email = null;
    this.token = null;
    this.updateUI();
  }

  save() {
    // Store user data in sessionStorage
    sessionStorage.setItem('user', JSON.stringify({
      isAuthenticated: this.isAuthenticated,
      token: this.token,
      name: this.name,
      email: this.email
    }));
  }

  notifyAuthChange() {
    if (this.onAuthChange) {
      this.onAuthChange();
    }
  }

  load() {
    // Load user data from sessionStorage
    const data = JSON.parse(sessionStorage.getItem('user'));
    if (data) {
      this.isAuthenticated = data.isAuthenticated;
      this.token = data.token;
      this.name = data.name;
      this.email = data.email;
    }
  }

  updateUI() {
    if (typeof this.onAuthChange === 'function') {
      this.onAuthChange();
    }
  }
}
