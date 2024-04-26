// api.js
import { user } from './auth.js';

// Import local data
import { dashboardData, balanceData, categoryData, transactionData } from './localData.js';

// Environment flag to switch between local data and API call
const useLocalData = window.location.hostname === 'localhost';

export function fetchCategories() {
  if (useLocalData) {
    // Using local data for categories
    return Promise.resolve(categoryData().data.category);
  } else {
    if (!user.isAuthenticated) throw new Error('User is not authenticated.');
    return axios.get(`${process.env.API_URL}/api/categories`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    }).then(response => response.data.data)
      .catch(error => {
        console.error('Failed to fetch categories', error);
        return [];
      });
  }
}

// Add the actual implementation for these API calls
export function fetchDashboard() {
  if (useLocalData) {
    // Using local data for dashboard
    return Promise.resolve(dashboardData().data);
  } else {
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
}

// api.js
export function fetchTransactions() {
  if (useLocalData) {
    // Using local data for transactions
    return Promise.resolve(transactionData().data);
  } else {
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
}

export function fetchBalance() {
  if (useLocalData) {
    // Using local data for balance
    return Promise.resolve(balanceData().data);
  } else {
    // Make an API call if not using local data
    if (!user.isAuthenticated) throw new Error('User is not authenticated.');
    return axios.get(`${process.env.API_URL}/api/balance`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    }).then(response => response.data)
      .catch(error => {
        console.error('Failed to fetch balance', error);
        return null;
      });
  }
}
