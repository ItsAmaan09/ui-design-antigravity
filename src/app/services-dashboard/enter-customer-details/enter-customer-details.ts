import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentDetailsComponent } from '../payment-details/payment-details';

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

  onSearch() {
    if (this.customerId().trim()) {
      this.showPaymentDetails.set(true);
    }
  }

  goBack() {
    this.back.emit();
  }
}
