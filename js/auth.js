// auth.js
import User from './user.js';

const user = new User();
import config from './config.js';

export async function handleGoogleCallback(code) {
  console.log("HANDLEGOOGLECALLBACK")
  console.log(code)
  try {
    const response = await axios.post(`${config.API_URL}/auth/google/callback`, { code });
    user.loginWithGoogle(response.data.token);
    page.redirect(`${config.URL_PREFIX}profile`); // Redirect to profile page after successful login
  } catch (error) {
    console.error('Error processing Google login:', error);
    page.redirect(`${config.URL_PREFIX}login`); // Redirect to login page on error
  }
}

export async function onLoginSuccess(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const response = await axios.post(`${config.API_URL}login`, { email, password });
    sessionStorage.setItem('token', response.data.token);
    console.log('Logged in successfully');
    page.redirect(`${config.URL_PREFIX}profile`);
  } catch (error) {
    console.error('Login failed:', error);
    document.getElementById('login-error').textContent = 'Failed to login';
  }
}

export async function onSignupSuccess(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const response = await axios.post(`${config.API_URL}signup`, { name, email, password });
    console.log('Signup successful', response);
    page.redirect(`${config.URL_PREFIX}login`);
  } catch (error) {
    console.error('Signup failed:', error);
    document.getElementById('signup-error').textContent = 'Failed to sign up';
  }
}

export function onLoginFailure(error) {
  console.log(error);
  document.getElementById('login-error').textContent = 'Failed to login with Google';
  page.redirect(`${config.URL_PREFIX}login`);
}

export function onLogout(navbar) {
  axios.post(`${config.API_URL}api/logout`, {}, { headers: { 'Authorization': `Bearer ${user.token}` } })
    .finally(() => {
      navbar.onLogout();
      user.logout(); // This should clear the user data and update isAuthenticated to false
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('token');
      page.redirect(`${config.URL_PREFIX}login`);
    });
}


export { user };
