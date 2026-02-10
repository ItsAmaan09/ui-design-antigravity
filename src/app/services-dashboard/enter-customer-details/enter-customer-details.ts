import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enter-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enter-customer-details.html',
  styleUrl: './enter-customer-details.scss'
})
export class EnterCustomerDetailsComponent {
  back = output<void>();
  customerId = signal<string>('');

  onSearch() {
    console.log('Searching for Customer ID:', this.customerId());
    // Implementation for lookup would go here
  }

  goBack() {
    this.back.emit();
  }
}
