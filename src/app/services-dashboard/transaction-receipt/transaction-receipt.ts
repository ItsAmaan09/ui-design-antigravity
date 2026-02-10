import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TransactionData {
  transactionId: string;
  provider: string;
  providerLogo: string;
  reference: string;
  dateTime: string;
  status: string;
  amountPaid: string;
}

@Component({
  selector: 'app-transaction-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-receipt.html',
  styleUrl: './transaction-receipt.scss'
})
export class TransactionReceiptComponent {
  back = output<void>();
  
  // In a real app, this would be an input from the payment response
  receiptData = signal<TransactionData>({
    transactionId: 'TXN007022',
    provider: 'Necsom',
    providerLogo: 'assets/necsom-logo.png',
    reference: '1',
    dateTime: 'Feb 10, 2026 02:20 PM',
    status: 'Completed',
    amountPaid: '$1.00'
  });

  goBack() {
    this.back.emit();
  }

  shareReceipt() {
    console.log('Sharing receipt...', this.receiptData());
  }

  cancelTransaction() {
    console.log('Cancelling transaction...');
    this.back.emit();
  }
}
