import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
}
