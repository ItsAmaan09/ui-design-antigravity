import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Beneficiary {
  id: string;
  name: string;
  reference: string;
  lastPaid: string;
  logo: string;
}

@Component({
  selector: 'app-select-beneficiary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-beneficiary.html',
  styleUrl: './select-beneficiary.scss'
})
export class SelectBeneficiaryComponent {
  provider = input.required<any>();
  back = output<void>();

  beneficiaries = signal<Beneficiary[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      reference: 'CUST-2847',
      lastPaid: '$45.00',
      logo: 'assets/necsom-logo.png'
    },
    {
      id: '2',
      name: 'Fatima Ali',
      reference: 'CUST-1923',
      lastPaid: '$75.25',
      logo: 'assets/necsom-logo.png'
    },
    {
      id: '3',
      name: 'Mohamed Abdi',
      reference: 'CUST-5612',
      lastPaid: '$32.50',
      logo: 'assets/necsom-logo.png'
    }
  ]);

  goBack() {
    this.back.emit();
  }
}
