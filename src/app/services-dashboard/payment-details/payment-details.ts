import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CustomerData {
  name: string;
  id: string;
  balance: string;
}

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.scss'
})
export class PaymentDetailsComponent {
  back = output<void>();
  
  customer = signal<CustomerData>({
    name: 'Abdirahman Mohamed',
    id: '1',
    balance: '$32.50'
  });

  paymentAmount = signal<string>('0.00');

  get displayAmount(): string {
    const amt = parseFloat(this.paymentAmount());
    return isNaN(amt) ? '0.00' : amt.toFixed(2);
  }

  goBack() {
    this.back.emit();
  }

  onPay() {
    console.log('Processing payment of:', this.displayAmount);
  }
}
