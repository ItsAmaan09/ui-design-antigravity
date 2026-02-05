import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface StatCard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
  trend?: string;
  trendIcon?: string;
  trendColor?: string;
}

@Component({
  selector: 'app-manage-corporate',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-corporate.html',
  styleUrl: './manage-corporate.scss',
})
export class ManageCorporate implements OnInit {
  
  corporateId: string = '';
  corporateName: string = 'Dahabshiil Business Services';
  corporateCode: string = 'BIZ-2024-001';
  corporateType: string = 'Financial Services';
  corporateStatus: string = 'Active';

  stats: StatCard[] = [
    {
      title: 'Total Users',
      value: 156,
      subtitle: '+12 this month',
      icon: 'bi-people',
      bgColor: 'bg-primary-subtle',
      textColor: 'text-primary',
      iconColor: 'text-primary',
      trend: '+12 this month',
      trendIcon: 'bi-arrow-up',
      trendColor: 'text-success'
    },
    {
      title: 'Active Users (30 days)',
      value: 121,
      subtitle: '78% activity rate',
      icon: 'bi-activity',
      bgColor: 'bg-success-subtle',
      textColor: 'text-success',
      iconColor: 'text-success',
      trend: '78% activity rate',
      trendIcon: 'bi-graph-up',
      trendColor: 'text-success'
    },
    {
      title: 'Pending Approvals',
      value: 12,
      subtitle: 'Requires action',
      icon: 'bi-clock-history',
      bgColor: 'bg-warning-subtle',
      textColor: 'text-warning',
      iconColor: 'text-warning',
      trend: 'Requires action',
      trendIcon: 'bi-exclamation-circle',
      trendColor: 'text-warning'
    },
    {
      title: 'Active Features',
      value: 5,
      subtitle: 'Bank controlled',
      icon: 'bi-check-circle',
      bgColor: 'bg-info-subtle',
      textColor: 'text-info',
      iconColor: 'text-info',
      trend: 'Bank controlled',
      trendIcon: 'bi-shield-check',
      trendColor: 'text-info'
    },
    {
      title: 'Payrolls (This Month)',
      value: 24,
      subtitle: '+15% from last month',
      icon: 'bi-currency-dollar',
      bgColor: 'bg-light',
      textColor: 'text-dark',
      iconColor: 'text-dark',
      trend: '+15% from last month',
      trendIcon: 'bi-arrow-up',
      trendColor: 'text-success'
    },
    {
      title: 'Employees in Payroll',
      value: 287,
      subtitle: 'Active employees',
      icon: 'bi-person-badge',
      bgColor: 'bg-light',
      textColor: 'text-dark',
      iconColor: 'text-dark',
      trend: 'Active employees',
      trendIcon: 'bi-people',
      trendColor: 'text-muted'
    },
    {
      title: 'Payments (This Month)',
      value: 89,
      subtitle: 'Various services',
      icon: 'bi-credit-card',
      bgColor: 'bg-light',
      textColor: 'text-dark',
      iconColor: 'text-dark',
      trend: 'Various services',
      trendIcon: 'bi-wallet2',
      trendColor: 'text-muted'
    },
    {
      title: 'Total Transaction Value',
      value: '$570,000',
      subtitle: 'This month',
      icon: 'bi-graph-up-arrow',
      bgColor: 'bg-primary',
      textColor: 'text-white',
      iconColor: 'text-white',
      trend: 'This month',
      trendIcon: '',
      trendColor: 'text-white'
    },
    {
      title: 'Fees Paid (This Month)',
      value: '$3,420',
      subtitle: 'Transaction fees',
      icon: 'bi-cash-stack',
      bgColor: 'bg-light',
      textColor: 'text-success',
      iconColor: 'text-success',
      trend: 'Transaction fees',
      trendIcon: 'bi-currency-dollar',
      trendColor: 'text-success'
    },
    {
      title: 'Transfer Transactions',
      value: 46,
      subtitle: 'RTGS, SIPS, SWIFT',
      icon: 'bi-arrow-left-right',
      bgColor: 'bg-light',
      textColor: 'text-dark',
      iconColor: 'text-dark',
      trend: 'RTGS, SIPS, SWIFT',
      trendIcon: 'bi-bank',
      trendColor: 'text-muted'
    },
    {
      title: 'Successful Transactions',
      value: 279,
      subtitle: '95.9% success rate',
      icon: 'bi-check-circle',
      bgColor: 'bg-light',
      textColor: 'text-success',
      iconColor: 'text-success',
      trend: '95.9% success rate',
      trendIcon: 'bi-graph-up',
      trendColor: 'text-success'
    },
    {
      title: 'Failed Transactions',
      value: 12,
      subtitle: '4.1% failure rate',
      icon: 'bi-x-circle',
      bgColor: 'bg-light',
      textColor: 'text-danger',
      iconColor: 'text-danger',
      trend: '4.1% failure rate',
      trendIcon: 'bi-graph-down',
      trendColor: 'text-danger'
    }
  ];

  ngOnInit() {
    this.corporateId = this.route.snapshot.paramMap.get('id') || '';
    // In a real app, you would fetch corporate details based on this ID
  }

  constructor(private route: ActivatedRoute) {}
}
