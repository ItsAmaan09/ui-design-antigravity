import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  initials: string;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdDate: string;
}

@Component({
  selector: 'app-corporate-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './corporate-users-list.html',
  styleUrls: ['./corporate-users-list.scss']
})
export class CorporateUsersListComponent {
  businessName: string = 'Dahabshiil Business Services';
  businessId: string = 'BIZ-2024-001';
  businessType: string = 'Financial Services';

  users: User[] = [
    {
      initials: 'HA',
      name: 'Hassan Ali Mohamed',
      email: 'hassan@dahabshiil.com',
      phone: '+252 61 234 5678',
      roles: ['Inputter', 'Reviewer'],
      status: 'Active',
      lastLogin: '18/Jan/2026 10:30 AM',
      createdDate: '10/Jan/2026'
    },
    {
      initials: 'AM',
      name: 'Amina Yusuf Hassan',
      email: 'amina@dahabshiil.com',
      phone: '+252 63 345 6789',
      roles: ['Authorizer'],
      status: 'Active',
      lastLogin: '18/Jan/2026 09:15 AM',
      createdDate: '12/Jan/2026'
    },
    {
      initials: 'MO',
      name: 'Mohamed Ahmed Ali',
      email: 'mohamed@dahabshiil.com',
      phone: '+252 61 456 7890',
      roles: ['Inputter'],
      status: 'Inactive',
      lastLogin: '15/Jan/2026 04:20 PM',
      createdDate: '08/Jan/2026'
    },
    {
      initials: 'FA',
      name: 'Fatima Omar Hassan',
      email: 'fatima@dahabshiil.com',
      phone: '+252 63 567 8901',
      roles: ['Admin'],
      status: 'Active',
      lastLogin: '18/Jan/2026 11:45 AM',
      createdDate: '05/Jan/2026'
    },
    {
      initials: 'IB',
      name: 'Ibrahim Hassan Abdi',
      email: 'ibrahim@dahabshiil.com',
      phone: '+252 61 678 9012',
      roles: ['User'],
      status: 'Active',
      lastLogin: '17/Jan/2026 03:10 PM',
      createdDate: '15/Jan/2026'
    }
  ];

  getRoleClass(role: string): string {
    switch (role) {
      case 'Inputter': return 'bg-primary-subtle text-primary';
      case 'Reviewer': return 'bg-purple-subtle text-purple';
      case 'Authorizer': return 'bg-success-subtle text-success';
      case 'Admin': return 'bg-danger-subtle text-danger';
      case 'User': return 'bg-secondary-subtle text-secondary';
      default: return 'bg-light text-dark';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-success-subtle text-success';
      case 'Inactive': return 'bg-secondary-subtle text-secondary';
      default: return 'bg-light text-dark';
    }
  }
}
