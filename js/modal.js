// Import any necessary functions from other modules
import { fetchCategories } from './api.js';

// Modal-related code
export class TransactionModal {
  constructor() {
    this.modal = document.getElementById('transaction-modal');
    this.form = document.getElementById('transaction-form');
    this.closeButton = document.getElementById('.close-button');

    // Bind class methods
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.populateCategories = this.populateCategories.bind(this);

    // Add event listeners
    // this.closeButton.addEventListener('click', this.close);
    // this.form.addEventListener('submit', this.submit);

    // Fetch categories when instantiated
    this.populateCategories();
  }

  open() {
    if (this.modal) {
      this.modal.style.display = 'block';
    }
  }

  close() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  submit(event) {
    event.preventDefault();
    const transactionData = new FormData(this.form);

    // TODO: Send transaction data to the backend
    console.log('Transaction data submitted:', Object.fromEntries(transactionData.entries()));
    this.close();
  }

  populateCategories() {
    fetchCategories().then(categories => {
      const categorySelect = this.form.elements['category'];
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; // Assuming categories have an id
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    });
  }
}

