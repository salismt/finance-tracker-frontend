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

    <!-- Input Transaction Modal -->
  <div id="transaction-modal" class="modal">
    <div class="modal-content">
      <span class="close-button" onclick="closeModal()">&times;</span>
      <h2>Input Transaction</h2>
      <form id="transaction-form">
        <label for="transaction-name">Transaction Name</label>
        <input type="text" id="transaction-name" name="transaction-name" required>

        <label for="category">Category</label>
        <select id="category" name="category">
          <!-- Categories options will be populated dynamically -->
        </select>

        <label for="transaction-date">Date of Transaction</label>
        <input type="date" id="transaction-date" name="transaction-date" required>

        <label for="amount">Amount</label>
        <input type="number" id="amount" name="amount" step="0.01" required>

        <label for="type">Type</label>
        <select id="type" name="type">
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  `;

  // Fetch and populate the data
  fetchDashboard();
}
