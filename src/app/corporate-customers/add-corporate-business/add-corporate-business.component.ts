import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CorporateService } from '../../services/corporate';

@Component({
  selector: 'app-add-corporate-business',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-corporate-business.component.html',
  styleUrls: ['./add-corporate-business.component.scss']
})
export class AddCorporateBusinessComponent {
  cifNumber: string = '';
  isSearched: boolean = false;

  constructor(
    private corporateService: CorporateService,
    private router: Router
  ) {}

  mockBusinessData = {
    name: 'Abdullah Business Services',
    type: 'Financial Services',
    contactPerson: 'Abdullah Ahmed Mohamed',
    phone: '+252 61 234 5678',
    email: 'abdullah.ahmed.mohamed@company.so',
    accountNumber: '100003434'
  };

  mockAccounts = [
    { cif: '232312', accountNumber: '100003434', accountName: 'Abdullah Ahmed Mohamed', selected: true },
    { cif: '232312', accountNumber: '100009876', accountName: 'Ahmed Ali Omar', selected: false },
    { cif: '232312', accountNumber: '100001122', accountName: 'Safiya Abdullah Ahmed', selected: false },
    { cif: '232312', accountNumber: '100007755', accountName: 'Ibrahim Hassan Abdi', selected: false }
  ];

  features = [
    { id: 'dashboard', name: 'Dashboard', selected: false },
    { id: 'user_mgmt', name: 'User Management', selected: false },
    { id: 'payroll', name: 'Payroll Processing', selected: false },
    { id: 'payment_reqs', name: 'Payment Requests', selected: false },
    { id: 'reports', name: 'Reports & Analytics', selected: false },
    { id: 'multi_account', name: 'Multi-Account Support', selected: false },
    { id: 'approval_flow', name: 'Approval Workflow', selected: false },
    { id: 'notifications', name: 'Notifications', selected: false }
  ];

  onSearch() {
    if (this.cifNumber.length === 6) {
      this.isSearched = true;
    } else {
      alert('Please enter a 6-digit CIF number');
    }
  }

  toggleAccount(account: any) {
    account.selected = !account.selected;
  }

  toggleFeature(feature: any) {
    feature.selected = !feature.selected;
  }

  onCreateBusiness() {
    const selectedAccounts = this.mockAccounts.filter(acc => acc.selected);
    const selectedFeatures = this.features.filter(feat => feat.selected).map(feat => feat.id);

    if (selectedAccounts.length === 0) {
      alert('Please select at least one account');
      return;
    }

    const payload = {
      CifNumber: this.cifNumber,
      BusinessInfo: {
        Name: this.mockBusinessData.name,
        Type: this.mockBusinessData.type,
        ContactPerson: this.mockBusinessData.contactPerson,
        Phone: this.mockBusinessData.phone,
        Email: this.mockBusinessData.email,
        AccountNumber: this.mockBusinessData.accountNumber
      },
      Accounts: selectedAccounts.map(acc => ({
        AccountNumber: acc.accountNumber,
        AccountName: acc.accountName
      })),
      Features: selectedFeatures
    };

    console.log('Creating business with payload:', payload);

    this.corporateService.createBusiness(payload).subscribe({
      next: (response) => {
        if (response.Status) {
          alert('Business created successfully!');
          this.router.navigate(['/corporate-customers']);
        } else {
          alert('Failed to create business: ' + response.Message);
        }
      },
      error: (error) => {
        console.error('Error creating business:', error);
        alert('An error occurred while creating the business. (Mock API might fail)');
        // For development/demo purposes, we might still want to navigate
        // this.router.navigate(['/corporate-customers']);
      }
    });
  }
}
