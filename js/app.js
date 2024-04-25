document.addEventListener('DOMContentLoaded', function() {
  page('/', index);
  page('/categories', categories);
  page('/transactions', transactions);
  page('/login', login);
  page();
});

function index() {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Home Page</h1><p>Welcome to our finance tracker.</p>';
}

function categories() {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Categories</h1><div>Loading categories...</div>';

  fetchCategories().then(categories => {
    if (categories.length === 0) {
      app.innerHTML = '<h1>Categories</h1><div>No categories found or failed to load.</div>';
    } else {
      const list = categories.map(cat => `<li>${cat.name}</li>`).join('');
      app.innerHTML = `<h1>Categories</h1><ul>${list}</ul>`;
    }
  });
}

function transactions() {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Transactions</h1>';
  // Simulate fetching data
  fetchTransactions().then(transactions => {
    const items = transactions.map(trans => `<li>${trans.description} - $${trans.amount}</li>`).join('');
    app.innerHTML += `<ul>${items}</ul>`;
  });
}

function login() {
  const app = document.getElementById('app');
  app.innerHTML = `
        <h1>Login</h1>
        <div id="my-signin2"></div> <!-- Google Sign-In button -->
        <div id="login-error"></div>
    `;

  // Render Google Sign-In button
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onLoginSuccess,
    'onfailure': onLoginFailure
  });
}

function fetchCategories() {
  const token = sessionStorage.getItem('token'); // Retrieve the auth token stored in session
  return axios.get(`${process.env.API_URL}/api/categories`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch categories', error);
      return []; // Return an empty array in case of error to handle gracefully
    });
}

function fetchTransactions() {
  return Promise.resolve([{ description: 'Grocery shopping', amount: 25.00 }, { description: 'Electric bill', amount: 60.00 }]);
}

function onLoginSuccess(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('Logged in as: ' + profile.getName());
  // Store the token in sessionStorage for subsequent API calls
  sessionStorage.setItem('isAuthenticated', 'true');
  sessionStorage.setItem('token', googleUser.getAuthResponse().id_token);
  page.redirect('/'); // Redirect to home page after login
}

function onLoginFailure(error) {
  console.log(error);
  document.getElementById('login-error').textContent = 'Failed to login with Google';
}

window.onload = function() {
  if (document.cookie.indexOf('connect.sid') !== -1) {
    sessionStorage.setItem('isAuthenticated', 'true');
  }
};

