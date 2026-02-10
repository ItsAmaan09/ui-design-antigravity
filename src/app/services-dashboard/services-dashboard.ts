import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProviderComponent } from './select-provider/select-provider';

export interface ServiceItem {
  id: string;
  name: string;
  categoryCode: string;
  icon: string;
  color: string;
}

export interface TransactionItem {
  provider: string;
  providerLogo: string;
  reference: string;
  amount: string;
  dateTime: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

@Component({
  selector: 'app-services-dashboard',
  standalone: true,
  imports: [CommonModule, SelectProviderComponent],
  templateUrl: './services-dashboard.html',
  styleUrl: './services-dashboard.scss'
})
export class ServicesDashboardComponent implements OnInit {
  services = signal<ServiceItem[]>([]);
  transactions = signal<TransactionItem[]>([]);
  selectedCategory = signal<string | null>(null);

  constructor() {}

  onServiceClick(service: ServiceItem) {
    this.selectedCategory.set(service.categoryCode);
  }

  clearSelection() {
    this.selectedCategory.set(null);
  }

  ngOnInit() {
    // Mocking API call for services
    this.services.set([
      { id: '1', name: 'Water', categoryCode: 'water', icon: 'bi-droplet-fill', color: '#e3f2fd' },
      { id: '2', name: 'Electricity', categoryCode: 'electricity', icon: 'bi-lightning-charge-fill', color: '#fff9c4' },
      { id: '3', name: 'TV Cable', categoryCode: 'tv_cable', icon: 'bi-tv', color: '#f3e5f5' },
      { id: '4', name: 'School', categoryCode: 'school', icon: 'bi-book', color: '#e8f5e9' },
      { id: '5', name: 'University', categoryCode: 'university', icon: 'bi-mortarboard', color: '#fbe9e7' },
      { id: '6', name: 'Canshuur', categoryCode: 'canshuur', icon: 'bi-file-text', color: '#f3e5f5' },
      { id: '7', name: 'Gas', categoryCode: 'gas', icon: 'bi-fire', color: '#fff3e0' },
      { id: '8', name: 'Health', categoryCode: 'health', icon: 'bi-heart-fill', color: '#fce4ec' }
    ]);

    // Mocking API call for transactions
    this.transactions.set([
      {
        provider: 'Necsom',
        providerLogo: 'assets/necsom-logo.png', // Fallback to icon if not found
        reference: 'CUST-2847',
        amount: '$45.00',
        dateTime: 'Feb 6, 2026 14:32',
        status: 'Completed'
      },
      {
        provider: 'Mogadishu Power Supply',
        providerLogo: 'assets/mps-logo.png',
        reference: 'MTR-9821',
        amount: '$120.50',
        dateTime: 'Feb 5, 2026 09:15',
        status: 'Completed'
      },
      {
        provider: 'Necsom',
        providerLogo: 'assets/necsom-logo.png',
        reference: 'CUST-1923',
        amount: '$75.25',
        dateTime: 'Feb 4, 2026 16:48',
        status: 'Completed'
      }
    ]);
  }
}
