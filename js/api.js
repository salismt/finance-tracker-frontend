// api.js
import { user } from './auth.js';

export function fetchCategories() {
  if (!user.isAuthenticated) throw new Error('User is not authenticated.');
  return axios.get(`${process.env.API_URL}/api/categories`, {
    headers: { 'Authorization': `Bearer ${user.token}` }
  }).then(response => response.data)
    .catch(error => {
      console.error('Failed to fetch categories', error);
      return [];
    });
}

export function fetchTransactions() {
  if (!user.isAuthenticated) throw new Error('User is not authenticated.');
  return Promise.resolve([{ description: 'Grocery shopping', amount: 25.00 }, { description: 'Electric bill', amount: 60.00 }]);
}

// Add the actual implementation for these API calls
export function fetchDashboard() {
  axios.get('/api/dashboard', { headers: {/* ... */} })
    .then(response => {
      const data = response.data;
      document.getElementById('current-balance').textContent = data.balance.toFixed(2);
      document.getElementById('total-expense').textContent = data.total_expense.toFixed(2);
      document.getElementById('total-income').textContent = data.total_income.toFixed(2);
    })
    .catch(error => console.error('Failed to fetch current balance', error));
}

