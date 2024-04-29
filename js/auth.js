// auth.js
import User from './user.js';
import config from './config.js';
const user = new User();

export async function onLoginSuccess(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const response = await axios.post(`${config.API_URL}auth/login`, { email, password });
    user.loginWithPassport(response.data.token, response.data.user)
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
    const response = await axios.post(`${config.API_URL}auth/signup`, { name, email, password });
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
      page.redirect(`${config.URL_PREFIX}login`);
    });
}


export { user };
