// api.js
import { user } from './auth.js';

export function fetchCategories() {
  if (!user.isAuthenticated) throw new Error('User is not authenticated.');
  return axios.get(`${process.env.API_URL}/api/categories`, {
    headers: { 'Authorization': `Bearer ${user.token}` }
  }).then(response => response.data.data)
    .catch(error => {
      console.error('Failed to fetch categories', error);
      return [];
    });
}

// Add the actual implementation for these API calls
export function fetchDashboard() {
  if (!user.isAuthenticated) throw new Error('User is not authenticated.');
  axios.get(`${process.env.API_URL}/api/dashboard`, { headers: { 'Authorization': `Bearer ${user.token}` } })
    .then(response => {
      const data = response.data.data;
      document.getElementById('current-balance').textContent = data.balance.toFixed(2);
      document.getElementById('total-expense').textContent = data.total_expense.toFixed(2);
      document.getElementById('total-income').textContent = data.total_income.toFixed(2);
    })
    .catch(error => console.error('Failed to fetch current balance', error));
}

// api.js
export function fetchTransactions() {
  // Replace with the actual API endpoint
  axios.get(`${process.env.API_URL}/api/transactions`, { headers: { 'Authorization': `Bearer ${user.token}` } })
    .then(response => {
      const transactions = response.data.data;
      const transactionsList = document.getElementById('transactions-list');
      transactionsList.innerHTML = transactions.map(trans => `
        <div class="transaction-item">
          <span class="transaction-description">${trans.description}</span>
          <span class="transaction-date">${new Date(trans.date).toLocaleDateString()}</span>
          <span class="transaction-category">${trans.category}</span>
          <span class="transaction-amount">$${trans.amount.toFixed(2)}</span>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Failed to fetch transactions', error);
      // Handle the error, e.g., show a message to the user
    });
}

