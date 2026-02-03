import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  statusColor?: string; // for the icon or indicator
}

interface Business {
  id: string;
  name: string;
  email: string; // usually subtitle under name
  logoText: string; // e.g. "DA", "HO"
  type: string;
  contactPerson: string;
  contactPhone: string;
  plan: 'Enterprise' | 'Professional' | 'Basic';
  users: number;
  status: 'Active' | 'Suspended' | 'Inactive';
  createdDate?: string; // Mock for view modal
  features?: string[]; // Mock for view modal
}

@Component({
  selector: 'app-corporate-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corporate-customers.component.html',
  styleUrls: ['./corporate-customers.component.scss']
})
export class CorporateCustomersComponent {
  stats: StatCard[] = [
    { title: 'Total Businesses', value: 7, icon: 'bi-building', statusColor: 'text-primary' },
    { title: 'Active Businesses', value: 6, icon: 'bi-check-circle', statusColor: 'text-success' },
    { title: 'Suspended', value: 1, icon: 'bi-slash-circle', statusColor: 'text-danger' },
    { title: 'Total Users', value: 1055, icon: 'bi-people', statusColor: 'text-info' }
  ];

  businesses: Business[] = [
    {
      id: 'BIZ-2024-001',
      name: 'Dahabshiil Business Services',
      email: 'hassan@dahabshiil.com',
      logoText: 'DA',
      type: 'Financial Services',
      contactPerson: 'Hassan Yusuf Ahmed',
      contactPhone: '+252 61 234 5678',
      plan: 'Enterprise',
      users: 156,
      status: 'Active'
    },
    {
      id: 'BIZ-2024-002',
      name: 'Hormuud Telecom Somalia',
      email: 'amina@hormuud.com',
      logoText: 'HO',
      type: 'Telecommunications',
      contactPerson: 'Amina Mohamed Ali',
      contactPhone: '+252 63 345 6789',
      plan: 'Enterprise',
      users: 287,
      status: 'Active'
    },
    {
      id: 'BIZ-2024-003',
      name: 'Golis Telecom Company',
      email: 'ahmed@golis.com',
      logoText: 'GO',
      type: 'Telecommunications',
      contactPerson: 'Ahmed Ali Omar',
      contactPhone: '+252 61 456 7890',
      plan: 'Professional',
      users: 92,
      status: 'Active'
    },
    {
      id: 'BIZ-2024-004',
      name: 'Somali Electricity Authority',
      email: 'fatima@sea.gov.so',
      logoText: 'SO',
      type: 'Utilities',
      contactPerson: 'Fatima Omar Hassan',
      contactPhone: '+252 63 567 8901',
      plan: 'Professional',
      users: 45,
      status: 'Suspended'
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-success-subtle text-success';
      case 'Suspended': return 'bg-danger-subtle text-danger';
      default: return 'bg-secondary-subtle text-secondary';
    }
  }

  getPlanClass(plan: string): string {
    switch (plan) {
      case 'Enterprise': return 'bg-primary-subtle text-primary';
      case 'Professional': return 'bg-info-subtle text-info';
      default: return 'bg-light text-dark';
    }
  }

  selectedBusiness: Business | null = null;

  viewBusiness(business: Business) {
    this.selectedBusiness = business;
  }
}
