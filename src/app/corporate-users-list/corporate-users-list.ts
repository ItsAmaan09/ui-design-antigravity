import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, startWith, map, Observable, Subject, of, debounceTime, distinctUntilChanged, switchMap, tap, delay, filter } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

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

interface RoleDef {
  name: string;
  badgeClass: string;
  description: string;
}

interface AccountDef {
  id: string;
  name: string;
}

export interface CreateUserRequestDto {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  company: string;
  accounts: string[];
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-corporate-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './corporate-users-list.html',
  styleUrls: ['./corporate-users-list.scss']
})
export class CorporateUsersListComponent implements OnInit {
  businessName: string = 'Dahabshiil Business Services';
  businessId: string = 'BIZ-2024-001';
  businessType: string = 'Financial Services';

  availableRoles: RoleDef[] = [
    { name: 'User', badgeClass: 'bg-secondary-subtle text-secondary', description: 'Access: Dashboard, Reports only' },
    { name: 'Inputter', badgeClass: 'bg-primary-subtle text-primary', description: 'Access: Dashboard, Reports, Payroll (send requests), Payments (initiate)' },
    { name: 'Reviewer', badgeClass: 'bg-purple-subtle text-purple', description: 'Access: Dashboard, Reports, Payroll (review only), Payments (review only)' },
    { name: 'Authorizer', badgeClass: 'bg-success-subtle text-success', description: 'Access: Dashboard, Reports, Payroll (approve), Payments (approve)' },
    { name: 'Admin', badgeClass: 'bg-danger-subtle text-danger', description: 'Access: All features, User management, Role management, Configuration' }
  ];

  // Mock Data Source for Search
  private allCompanies: string[] = [
    'Dahabshiil Business Services', 'Hormuud Telecom', 'Somali Electricity', 
    'IBS Bank', 'Premier Bank', 'Somtel', 'Golis Telecom', 'Salaam Bank', 
    'Amal Bank', 'MyBank', 'Telesom', 'Nationlink'
  ];

  companies$: Observable<string[]> = of([]);
  companyInput$ = new Subject<string>();
  companyLoading = false;
  
  accounts: AccountDef[] = [
    { id: 'ACC-001', name: 'ACC-001 (Main)' },
    { id: 'ACC-002', name: 'ACC-002 (Payroll)' },
    { id: 'ACC-003', name: 'ACC-003 (Petty Cash)' }
  ];

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

  filterForm = new FormGroup({
    search: new FormControl(''),
    role: new FormControl('All Roles')
  });

  createUserForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    account: new FormControl([], Validators.required),
   // status is optional/hidden in UI logic if hardcoded, but good to have
    status: new FormControl('Active') 
  });

  filteredUsers: User[] = [];

  ngOnInit() {
    this.filteredUsers = this.users; // Initial state

    combineLatest([
      this.filterForm.controls.search.valueChanges.pipe(startWith('')),
      this.filterForm.controls.role.valueChanges.pipe(startWith('All Roles'))
    ]).subscribe(([search, role]) => {
      this.filterUsers(search, role);
    });

    this.loadCompanies();
  }

  private loadCompanies() {
    this.companies$ = this.companyInput$.pipe(
      filter(term => !!term && term.length >= 3),
      distinctUntilChanged(),
      tap(() => this.companyLoading = true),
      debounceTime(400),
      switchMap(term => this.fakeCompanyApi(term)),
      tap(() => this.companyLoading = false)
    );
  }

  fakeCompanyApi(term: string): Observable<string[]> {
    // Simulate API call
    return of(this.allCompanies.filter(c => c.toLowerCase().includes(term.toLowerCase()))).pipe(delay(500));
  }

  filterUsers(search: string | null, role: string | null) {
    const searchTerm = (search || '').toLowerCase();
    const roleTerm = role || 'All Roles';

    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
      const matchesRole = roleTerm === 'All Roles' || user.roles.includes(roleTerm);
      return matchesSearch && matchesRole;
    });
  }

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

  onSubmit() {
    if (this.createUserForm.valid) {
      const formValue = this.createUserForm.value;
      
      const payload: CreateUserRequestDto = {
        fullName: formValue.fullName!,
        email: formValue.email!,
        phone: formValue.phone!,
        role: formValue.role!,
        address: formValue.address!,
        company: formValue.company!,
        accounts: formValue.account as unknown as string[], // Cast because form value inference can be tricky with multi-select
        status: (formValue.status as 'Active' | 'Inactive') || 'Active'
      };

      console.log('API Payload:', payload);
      // Here you would call: this.userService.createUser(payload).subscribe(...)
    }
  }
}
