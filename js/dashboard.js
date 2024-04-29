import { fetchDashboard } from './api.js';

export function renderDashboard() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="dashboard" class="dashboard">
      <div class="dashboard-item">
        <span>Current Balance</span>
        <div class="amount-box">$<span id="current-balance">Loading...</span></div>
      </div>
      <div class="dashboard-item">
        <span>Total Expense</span>
        <div class="amount-box">$<span id="total-expense">Loading...</span></div>
      </div>
      <div class="dashboard-item">
        <span>Total Income</span>
        <div class="amount-box">$<span id="total-income">Loading...</span></div>
      </div>
      <!-- For future development -->
      <!--<div class="dashboard-item full-width">
        <span>Balance History</span>
        <div id="balance-history" class="chart"></div>
      </div>
      <div class="dashboard-item full-width">
        <span>Categories</span>
        <div id="categories-chart" class="chart"></div>
      </div>-->
      <div class="dashboard-item full-width">
        <span>Transactions</span>
        <div id="last-transactions">Loading...</div>
      </div>
    </div>

    <!-- Input Transaction Modal -->

  `;

  fetchDashboard().then(dashboardData => {
    if (dashboardData != null) {
      document.getElementById('current-balance').textContent = dashboardData.current_balance;
      document.getElementById('total-expense').textContent = dashboardData.total_expense;
      document.getElementById('total-income').textContent = dashboardData.total_income;
      document.getElementById('last-transactions').innerHTML = dashboardData.transactions.slice(0, 3).map(trx => `
        <div class="transaction-item">
          <span class="transaction-description">${trx.name}</span>
          <span class="transaction-date">${new Date(trx.date).toLocaleDateString()}</span>
          <span class="transaction-category">${trx.category}</span>
          <span class="transaction-amount">$${trx.amount}</span>
        </div>
      `).join('');
    }
  });
}
