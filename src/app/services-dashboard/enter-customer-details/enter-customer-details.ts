import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentDetailsComponent, CustomerData } from '../payment-details/payment-details';

@Component({
  selector: 'app-enter-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule, PaymentDetailsComponent],
  templateUrl: './enter-customer-details.html',
  styleUrl: './enter-customer-details.scss'
})
export class EnterCustomerDetailsComponent {
  back = output<void>();
  customerId = signal<string>('');
  showPaymentDetails = signal<boolean>(false);
  selectedCustomer = signal<CustomerData | null>(null);

  private mockCustomers: CustomerData[] = [
    { id: '1', name: 'Abdirahman Mohamed', balance: '$32.50' },
    { id: '2', name: 'Amaan Mohammed', balance: '$120.00' },
    { id: '3', name: 'John Doe', balance: '$50.75' }
  ];

  onSearch() {
    const id = this.customerId().trim();
    if (id) {
      const found = this.mockCustomers.find(c => c.id === id);
      if (found) {
        this.selectedCustomer.set(found);
        this.showPaymentDetails.set(true);
      } else {
        alert('Customer not found! Please try ID 1, 2, or 3.');
      }
    }
  }

  goBack() {
    this.back.emit();
  }
}
