import config from "./config.js";
import {user} from "./auth.js";

export async function onAddTransaction(event) {
  event.preventDefault();
  const nameData = document.getElementById('transaction-name').value;
  const dateData = document.getElementById('transaction-date').value;
  const categoryData = document.getElementById('category').value;
  const amountData = document.getElementById('amount').value;
  const typeData = document.getElementById('type').value;
  try {
    const response = await axios.post(`${config.API_URL}api/transactions`, {
      name: nameData,
      date: dateData,
      amount: amountData,
      currency: "IDR",
      category: categoryData,
      type: typeData }, { headers: { 'Authorization': `Bearer ${user.token}` } });
    console.log('Add transaction successful', response);
    page.redirect(`${config.URL_PREFIX}transactions`);
  } catch (error) {
    console.error('Add transaction failed:', error);
    document.getElementById('add-transaction-error').textContent = 'Failed to add data';
  }
}
