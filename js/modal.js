// Import any necessary functions from other modules
import { fetchCategories } from './api.js';

// Modal-related code
export class TransactionModal {
  constructor() {
    this.modal = document.getElementById('transaction-modal');
    this.setupModal();
  }

  setupModal() {
    // Ensure modal content is fully loaded or dynamically create it here
    this.form = document.getElementById('transaction-form'); // Assuming the modal HTML is already in the DOM

    if (!this.form) {
      console.error('Transaction form is not available.');
      return;
    }

    this.closeButton = document.getElementById('close-button');
    this.closeButton.addEventListener('click', () => this.close());

    this.form.addEventListener('submit', (event) => this.submit(event));

    // Populate categories after ensuring the form is available
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
    }).catch(error => console.error('Failed to fetch categories:', error));
  }
}

