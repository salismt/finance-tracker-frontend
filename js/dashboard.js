import {
  fetchDashboard
} from './api.js';

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
      <div class="dashboard-item full-width">
        <span>Balance History</span>
        <div id="balance-history" class="chart"></div>
      </div>
      <div class="dashboard-item full-width">
        <span>Categories</span>
        <div id="categories-chart" class="chart"></div>
      </div>
      <div class="dashboard-item full-width">
        <span>Statements</span>
        <div id="last-transactions">Loading...</div>
      </div>
    </div>
  `;

  // Fetch and populate the data
  fetchDashboard();
}
