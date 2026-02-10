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
  receiptData = input.required<TransactionData>();
  back = output<void>();

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
