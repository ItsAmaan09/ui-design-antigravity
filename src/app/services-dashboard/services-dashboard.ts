import { Component, signal, OnInit, computed } from '@angular/core';
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

  // Pagination Signals
  currentPage = signal<number>(1);
  pageSize = signal<number>(5);

  pagedTransactions = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return this.transactions().slice(startIndex, startIndex + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.transactions().length / this.pageSize());
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  constructor() {}

  onServiceClick(service: ServiceItem) {
    this.selectedCategory.set(service.categoryCode);
  }

  clearSelection() {
    this.selectedCategory.set(null);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
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
        providerLogo: 'assets/necsom-logo.png',
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
      },
      {
        provider: 'Water Co',
        providerLogo: 'assets/water-logo.png',
        reference: 'WTR-7721',
        amount: '$32.10',
        dateTime: 'Feb 3, 2026 11:20',
        status: 'Completed'
      },
      {
        provider: 'TV Cable',
        providerLogo: 'assets/tv-logo.png',
        reference: 'TV-1102',
        amount: '$50.00',
        dateTime: 'Feb 2, 2026 18:05',
        status: 'Completed'
      },
      {
        provider: 'University',
        providerLogo: 'assets/uni-logo.png',
        reference: 'UNI-4492',
        amount: '$500.00',
        dateTime: 'Feb 1, 2026 10:00',
        status: 'Pending'
      },
      {
        provider: 'Necsom',
        providerLogo: 'assets/necsom-logo.png',
        reference: 'CUST-5512',
        amount: '$65.00',
        dateTime: 'Jan 31, 2026 15:30',
        status: 'Completed'
      },
      {
        provider: 'Gas Co',
        providerLogo: 'assets/gas-logo.png',
        reference: 'GAS-3381',
        amount: '$80.20',
        dateTime: 'Jan 30, 2026 09:45',
        status: 'Failed'
      },
      {
        provider: 'Mogadishu Power Supply',
        providerLogo: 'assets/mps-logo.png',
        reference: 'MTR-1104',
        amount: '$45.50',
        dateTime: 'Jan 29, 2026 14:12',
        status: 'Completed'
      },
      {
        provider: 'Necsom',
        providerLogo: 'assets/necsom-logo.png',
        reference: 'CUST-9920',
        amount: '$90.00',
        dateTime: 'Jan 28, 2026 12:00',
        status: 'Completed'
      },
      {
        provider: 'Health Center',
        providerLogo: 'assets/health-logo.png',
        reference: 'HLT-2210',
        amount: '$25.00',
        dateTime: 'Jan 27, 2026 08:30',
        status: 'Completed'
      },
      {
        provider: 'Water Co',
        providerLogo: 'assets/water-logo.png',
        reference: 'WTR-5511',
        amount: '$15.00',
        dateTime: 'Jan 26, 2026 17:15',
        status: 'Completed'
      }
    ]);
  }
}
