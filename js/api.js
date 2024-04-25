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
