// User.js
export default class User {
  constructor() {
    this.isAuthenticated = false;
    this.profile = null;
    this.token = null;
    this.onAuthChange = null;  // Observer for authentication changes
  }

  loginWithGoogle(googleUser) {
    this.isAuthenticated = true;
    this.token = googleUser.getAuthResponse().id_token;
    this.profile = googleUser.getBasicProfile();
    this._notifyAuthChange();
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    this.profile = null;
    this._notifyAuthChange();
  }

  _notifyAuthChange() {
    if (this.onAuthChange) {
      this.onAuthChange();
    }
  }

  fetchProfileData() {
    return {
      name: this.profile ? this.profile.getName() : '',
      email: this.profile ? this.profile.getEmail() : ''
    };
  }
}
