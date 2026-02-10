import { Component, input, output, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Provider {
  id: string;
  name: string;
  logo: string;
  status: 'Online' | 'Offline';
  description: string;
  category: string;
}

@Component({
  selector: 'app-select-provider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-provider.html',
  styleUrl: './select-provider.scss'
})
export class SelectProviderComponent {
  categoryCode = input.required<string>();
  back = output<void>();
  
  providers = signal<Provider[]>([]);
  filteredProviders = signal<Provider[]>([]);

  constructor() {
    effect(() => {
      const code = this.categoryCode();
      if (code) {
        this.loadProviders(code);
      }
    });
  }

  loadProviders(category: string) {
    // Mock provider data
    const allProviders: Provider[] = [
      {
        id: '1',
        name: 'Necsom',
        logo: 'assets/necsom-logo.png',
        status: 'Online',
        description: 'Real-time balance lookup available',
        category: 'electricity'
      },
      {
        id: '2',
        name: 'Mogadishu Power Supply',
        logo: 'assets/mps-logo.png',
        status: 'Offline',
        description: 'Manual entry required',
        category: 'electricity'
      },
      {
        id: '3',
        name: 'Water Co',
        logo: 'assets/water-logo.png',
        status: 'Online',
        description: 'Instant recharge available',
        category: 'water'
      }
    ];

    this.providers.set(allProviders);
    this.filteredProviders.set(allProviders.filter(p => p.category === category));
  }

  goBack() {
    this.back.emit();
  }

  getCategoryTitle(): string {
    const code = this.categoryCode();
    return code.charAt(0).toUpperCase() + code.slice(1);
  }
}
