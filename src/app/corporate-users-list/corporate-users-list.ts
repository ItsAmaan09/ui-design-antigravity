import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, startWith, map, Observable, Subject, of, debounceTime, distinctUntilChanged, switchMap, tap, delay, filter, catchError } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { CorporateService, CompanyResponseDto, AccountResponseDto } from '../services/corporate';

interface User {
  initials: string;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdDate: string;
  // Added fields for Edit functionality
  company: string;
  accounts: string[];
  address: string;
  profileImage?: string; // Added for photo upload
}



interface RoleDef {
  name: string;
  badgeClass: string;
  description: string;
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
  private _CorporateService = inject(CorporateService);

  isEditMode = false;
  editingUserId: string | null = null;

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

  companies: CompanyResponseDto[] = [];
  companies$: Observable<CompanyResponseDto[]> = of([]);
  companyInput$ = new Subject<string>();
  companyLoading = false;
  
  accountList: AccountResponseDto[] = [];
  selectedImage: string | null = null;

  users: User[] = [
    {
      initials: 'HA',
      name: 'Hassan Ali Mohamed',
      email: 'hassan@dahabshiil.com',
      phone: '+252 61 234 5678',
      roles: ['Inputter', 'Reviewer'],
      status: 'Active',
      lastLogin: '18/Jan/2026 10:30 AM',
      createdDate: '10/Jan/2026',
      company: 'Dahabshiil Business Services',
      accounts: ['ACC-001'],
      address: 'Mogadishu, Somalia'
    },
    {
      initials: 'AM',
      name: 'Amina Yusuf Hassan',
      email: 'amina@dahabshiil.com',
      phone: '+252 63 345 6789',
      roles: ['Authorizer'],
      status: 'Active',
      lastLogin: '18/Jan/2026 09:15 AM',
      createdDate: '12/Jan/2026',
      company: 'Hormuud Telecom',
      accounts: ['ACC-002'],
      address: 'Hargeisa, Somaliland'
    },
    {
      initials: 'MO',
      name: 'Mohamed Ahmed Ali',
      email: 'mohamed@dahabshiil.com',
      phone: '+252 61 456 7890',
      roles: ['Inputter'],
      status: 'Inactive',
      lastLogin: '15/Jan/2026 04:20 PM',
      createdDate: '08/Jan/2026',
      company: 'Somali Electricity',
      accounts: ['ACC-003'],
      address: 'Mogadishu, Somalia'
    },
    {
      initials: 'FA',
      name: 'Fatima Omar Hassan',
      email: 'fatima@dahabshiil.com',
      phone: '+252 63 567 8901',
      roles: ['Admin'],
      status: 'Active',
      lastLogin: '18/Jan/2026 11:45 AM',
      createdDate: '05/Jan/2026',
      company: 'Dahabshiil Business Services',
      accounts: ['ACC-001', 'ACC-002'],
      address: 'Mogadishu'
    },
    {
      initials: 'IB',
      name: 'Ibrahim Hassan Abdi',
      email: 'ibrahim@dahabshiil.com',
      phone: '+252 61 678 9012',
      roles: ['User'],
      status: 'Active',
      lastLogin: '17/Jan/2026 03:10 PM',
      createdDate: '15/Jan/2026',
      company: 'Somtel',
      accounts: ['ACC-003'],
      address: 'Garowe'
    }
  ];

  openCreateModal() {
    this.isEditMode = false;
    this.editingUserId = null;
    this.createUserForm.reset({ status: 'Active' });
    this.accountList = [];
    this.companies = []; 
    this.selectedImage = null; // Reset image
  }

  viewUser: User | null = null;

  openViewModal(user: User) {
    this.viewUser = user;
  }

  deletingUser: User | null = null;
  
  openDeleteModal(user: User) {
    this.deletingUser = user;
  }

  confirmDelete() {
    if (this.deletingUser) {
      console.log('Deleting user with ID (mock):', this.deletingUser.email);
      // API call will go here
      // this._CorporateService.deleteUser(this.deletingUser.email).subscribe(...)
      
      // Optionally remove from local list for immediate feedback or reload list
      this.deletingUser = null;
    }
  }

  openEditModal(user: User) {
    this.isEditMode = true;
    this.editingUserId = user.email; // Using email as ID for now
    this.selectedImage = user.profileImage || null; // Set user image if available
    
    // Patch simple values
    this.createUserForm.patchValue({
      fullName: user.name,
      email: user.email,
      phone: user.phone,
      role: user.roles[0], // Taking first role as form is single select
      address: user.address,
      status: user.status,
      // For company, we want to show it. ng-select binds to CompanyName.
      // We set the form control value. ng-select checks items.
      // If items are empty, it might show ID. 
      // We should probably allow the single value to be shown even if not in list, 
      // or pre-populate the list with at least this company.
      company: user.company
    });

    // Populate accounts
    // We need to fetch accounts for this company so they are selectable/shown
    // Since we don't have CompanyID easily in this mock User object, we might issue a search or just mock it.
    // In real app, User object should have CompanyID. 
    // I'll assume we pass CompanyName as ID for now or fetch by name.
    // Actually, getAccountByCorporateId takes `id`. Use company name as mock id if needed or implement lookup.
    
    // For now, let's trigger the account fetch using the company name as ID, or mock logic.
    // And set the account form value.
    this.getAccountByCorporateId(user.company); // Assuming ID logic handles string
    this.createUserForm.patchValue({ account: user.accounts as any });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

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

  getCorporatesData(term: string): Observable<CompanyResponseDto[]> {
    if (this.companies.length === 0) {
      // Fetch data first, then filter
      return this._CorporateService.getCorporates().pipe(
        map(response => {
           this.companies = response.Data;
           return this.companies.filter(c => c.CompanyName.toLowerCase().includes(term.toLowerCase()));
        })
      );
    } else {
      // Data already loaded, just filter locally
      return of(
        this.companies.filter((c) => c.CompanyName.toLowerCase().includes(term.toLowerCase())),
      );
    }
  }

  getCorporates() {
    this._CorporateService.getCorporates().subscribe({
      next: (response) => {
        this.companies = response.Data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadCompanies() {
    this.companies$ = this.companyInput$.pipe(
      filter((term) => !!term && term.length >= 3),
      distinctUntilChanged(),
      tap(() => (this.companyLoading = true)),
      debounceTime(400),
      switchMap((term) => 
        this.getCorporatesData(term).pipe(
          catchError((err) => {
            console.error('Company search error:', err);
            this.companyLoading = false;
            return of([]); // Return empty list to keep stream alive
          })
        )
      ),
      tap(() => (this.companyLoading = false)),
    );
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
        accounts: formValue.account as unknown as string[], 
        status: (formValue.status as 'Active' | 'Inactive') || 'Active'
      };

      console.log('API Payload:', payload);
      // Here you would call: this.userService.createUser(payload).subscribe(...)
    }
  }

  onCompanyChange(company: CompanyResponseDto) {
    // Reset accounts selection
    this.createUserForm.patchValue({ account: [] });
    this.accountList = [];

    if (company && company.CompanyId) {
      this.getAccountByCorporateId(company.CompanyId);
    }
  }

  getAccountByCorporateId(id: string) {
    this._CorporateService.getAccountsByCorporateIdAsync({ CompanyId: id }).subscribe({
      next: (response) => {
        this.accountList = response.Data;
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      },
    });
  }
}
