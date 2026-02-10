import { Component, output, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionReceiptComponent, TransactionData } from '../transaction-receipt/transaction-receipt';

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
  transactionResult = signal<TransactionData | null>(null);

  get displayAmount(): string {
    const amt = parseFloat(this.paymentAmount());
    return isNaN(amt) ? '0.00' : amt.toFixed(2);
  }

  goBack() {
    this.back.emit();
  }

  onPay() {
    const amount = this.displayAmount;
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { 
      month: 'short', day: '2-digit', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', hour12: true 
    });

    // Mock API Response Payload
    const response: TransactionData = {
      transactionId: 'TXN' + Math.floor(Math.random() * 900000 + 100000),
      provider: 'Necsom',
      providerLogo: 'assets/necsom-logo.png',
      reference: this.customer().id,
      dateTime: formattedDate,
      status: 'Completed',
      amountPaid: '$' + amount
    };

    console.log('Payment API Success. Response Payload:', response);
    
    this.transactionResult.set(response);
    this.showReceipt.set(true);
  }
}
