// auth.js
import User from './user.js';
import axios from 'axios'; // Ensure axios is available for making HTTP requests

const user = new User();

export async function handleGoogleCallback(code) {
  try {
    const response = await axios.post(`${process.env.FRONTEND_URL}/api/auth/google/callback`, { code });
    user.loginWithGoogle(response.data.token);
    page.redirect('/finance-tracker-frontend/profile'); // Redirect to profile page after successful login
  } catch (error) {
    console.error('Error processing Google login:', error);
    page.redirect('/finance-tracker-frontend/login'); // Redirect to login page on error
  }
}

export function onLoginSuccess(googleUser) {
  user.loginWithGoogle(googleUser.getAuthResponse().id_token);
  console.log('Logged in as:', user.fetchProfileData().name);
  page.redirect('/finance-tracker-frontend/profile');
}

export function onLoginFailure(error) {
  console.log(error);
  document.getElementById('login-error').textContent = 'Failed to login with Google';
  page.redirect('/finance-tracker-frontend/login');
}

export function onLogout() {
  user.logout();
  page.redirect('/finance-tracker-frontend/login');
}

export { user };
