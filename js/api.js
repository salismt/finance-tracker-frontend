// api.js
import { user } from './auth.js';
import config from './config.js';

// Import local data
import { dashboardData, balanceData, categoryData, transactionData } from './localData.js';

// Environment flag to switch between local data and API call
const useLocalData = config.NODE_ENV === 'development';

export function fetchCategories() {
  if (useLocalData) {
    // Using local data for categories
    return Promise.resolve(categoryData());
  } else {
    return axios.get(`${config.API_URL}api/categories`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    }).then(response => response.data)
      .catch(error => {
        console.error('Failed to fetch categories', error);
        return [];
      });
  }
}

export async function fetchDashboard() {
  if (useLocalData) {
    return Promise.resolve(dashboardData());
  } else {
    return axios.get(`${config.API_URL}api/dashboard`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      .then(response => response.data)
      .catch(error => console.error('Failed to fetch current balance', error));
  }
}

export async function fetchTransactions() {
  if (useLocalData) {
    return Promise.resolve(transactionData());
  } else {
    return axios.get(`${config.API_URL}api/transactions`, { headers: { 'Authorization': `Bearer ${user.token}` } })
      .then(response => response.data)
      .catch(error => {
        console.error('Failed to fetch transactions', error);
      });
  }
}

export async function fetchBalance() {
  if (useLocalData) {
    return Promise.resolve(balanceData());
  } else {
    return axios.get(`${config.API_URL}api/transactions/balance`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    }).then(response => response.data)
      .catch(error => {
        console.error('Failed to fetch balance', error);
        return null;
      });
  }
}
