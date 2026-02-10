import { Component, output, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionReceiptComponent } from '../transaction-receipt/transaction-receipt';

export interface CustomerData {
  name: string;
  id: string;
  balance: string;
}

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionReceiptComponent],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.scss'
})
export class PaymentDetailsComponent {
  customer = input.required<CustomerData>();
  back = output<void>();

  paymentAmount = signal<string>('0.00');
  showReceipt = signal<boolean>(false);

  get displayAmount(): string {
    const amt = parseFloat(this.paymentAmount());
    return isNaN(amt) ? '0.00' : amt.toFixed(2);
  }

  goBack() {
    this.back.emit();
  }

  onPay() {
    console.log('Processing payment payload for Customer ID:', this.customer().id, 'Amount:', this.displayAmount);
    this.showReceipt.set(true);
  }
}
