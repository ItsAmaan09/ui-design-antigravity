import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterCustomerDetailsComponent } from '../enter-customer-details/enter-customer-details';
import { CustomerData } from '../payment-details/payment-details';

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
  imports: [CommonModule, EnterCustomerDetailsComponent],
  templateUrl: './select-beneficiary.html',
  styleUrl: './select-beneficiary.scss'
})
export class SelectBeneficiaryComponent {
  provider = input.required<any>();
  back = output<void>();
  
  showManualEntry = signal<boolean>(false);
  preSelectedCustomer = signal<CustomerData | null>(null);

  onSelectBeneficiary(ben: Beneficiary) {
    this.preSelectedCustomer.set({
      id: ben.id,
      name: ben.name,
      balance: ben.lastPaid // Mapping lastPaid as mock balance for now
    });
    this.showManualEntry.set(true);
  }

  onManualEntryClick() {
    this.preSelectedCustomer.set(null);
    this.showManualEntry.set(true);
  }

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
