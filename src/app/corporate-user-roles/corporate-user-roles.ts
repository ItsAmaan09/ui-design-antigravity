import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';


interface Role {
  id: string;
  name: string;
  description: string;
  isSystem?: boolean;
  MenuPermissions?: any[];
}

interface MenuItem {
  MenuId: number;
  MenuCode: string;
  Title: string;
  Route: string;
  Icon: string | null;
  SortOrder: number;
  Children: MenuItem[];
  // For UI state
  expanded?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  // Permission flags
  CanView?: boolean;
  CanCreate?: boolean;
  CanEdit?: boolean;
  CanDelete?: boolean;
  CanApprove?: boolean;
}

@Component({
  selector: 'app-corporate-user-roles',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './corporate-user-roles.html',
  styleUrl: './corporate-user-roles.scss',
})
export class CorporateUserRoles implements OnInit {
  
  // Make Math available in template
  Math = Math;
  
  roles: Role[] = [
    { 
      id: '1', 
      name: 'doctor', 
      description: 'N/A',
      MenuPermissions: [
        { MenuId: 1, CanView: true, CanCreate: false, CanEdit: false, CanDelete: false, CanApprove: false },
        { MenuId: 7, CanView: true, CanCreate: true, CanEdit: true, CanDelete: false, CanApprove: false }
      ]
    },
    { id: '2', name: 'Tester', description: 'N/A' },
    { id: '3', name: 'Outstatistic', description: 'PGP' },
    { id: '4', name: 'Generic', description: 'N/A' },
    { id: '5', name: 'Pvp', description: 'PVP' },
    { id: '6', name: 'OutProducer', description: 'For testing purpose only' },
    { id: '7', name: 'Admin Lanes', description: 'Counter it was 7 minutes after midnight. The dog was lying on the grass in the middle of the lawn in' },
    { id: '8', name: 'TEST ROLE', description: 'FOR TESTING PURPOSE ONLY' },
    { id: '9', name: 'vViewer', description: 'Can view only' },
    { id: '10', name: 'Super Admin', description: 'super admin' },
  ];

  filteredRoles: Role[] = [];
  
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  permissionSearch = new FormControl('');

  roleForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  isEditMode = false;
  editingRoleId: string | null = null;
  deletingRole: Role | null = null;

  // Menu data for permissions
  menuData: MenuItem[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  ngOnInit() {
    this.filteredRoles = this.roles;
    this.updatePagination();

    this.searchForm.controls.search.valueChanges.subscribe(searchTerm => {
      this.filterRoles(searchTerm);
    });

    // Load menu data (simulating API response for now)
    this.loadMenuData();
  }

  loadMenuData() {
    // This would typically come from an API call
    // For now, using the provided API response structure
    const apiResponse = {
      "Success": true,
      "StatusCode": 200,
      "Message": "Success",
      "Data": [
        {
          "MenuId": 1,
          "MenuCode": "DASHBOARD",
          "Title": "Dashboard",
          "Route": "/dashboard",
          "Icon": "dashboard",
          "SortOrder": 1,
          "Children": []
        },
        {
          "MenuId": 2,
          "MenuCode": "REPORTS",
          "Title": "Reports",
          "Route": "/reports",
          "Icon": "bar_chart",
          "SortOrder": 2,
          "Children": [
            {
              "MenuId": 7,
              "MenuCode": "REPORT_STATEMENT",
              "Title": "Statement",
              "Route": "/reports/statement",
              "Icon": null,
              "SortOrder": 1,
              "Children": []
            },
            {
              "MenuId": 8,
              "MenuCode": "REPORT_TRANSACTIONS",
              "Title": "Transactions",
              "Route": "/reports/transactions",
              "Icon": null,
              "SortOrder": 2,
              "Children": []
            }
          ]
        },
        {
          "MenuId": 3,
          "MenuCode": "PAYROLL",
          "Title": "Payroll",
          "Route": "/payroll",
          "Icon": "payments",
          "SortOrder": 3,
          "Children": [
            {
              "MenuId": 9,
              "MenuCode": "PAYROLL_BENEFICIARY",
              "Title": "Manage Beneficiary",
              "Route": "/payroll/manage-beneficiary",
              "Icon": null,
              "SortOrder": 1,
              "Children": []
            },
            {
              "MenuId": 10,
              "MenuCode": "PAYROLL_GROUP",
              "Title": "Manage Group",
              "Route": "/payroll/manage-group",
              "Icon": null,
              "SortOrder": 2,
              "Children": []
            },
            {
              "MenuId": 11,
              "MenuCode": "PAYROLL_SEND",
              "Title": "Send Payroll",
              "Route": "/payroll/send-payroll",
              "Icon": null,
              "SortOrder": 3,
              "Children": []
            },
            {
              "MenuId": 12,
              "MenuCode": "PAYROLL_APPROVE",
              "Title": "Approve Payroll",
              "Route": "/payroll/approve-payroll",
              "Icon": null,
              "SortOrder": 4,
              "Children": []
            },
            {
              "MenuId": 13,
              "MenuCode": "PAYROLL_ADVANCE",
              "Title": "Advance Payroll",
              "Route": "/payroll/advance-payroll",
              "Icon": null,
              "SortOrder": 5,
              "Children": []
            },
            {
              "MenuId": 14,
              "MenuCode": "PAYROLL_HISTORY",
              "Title": "History",
              "Route": "/payroll/history",
              "Icon": null,
              "SortOrder": 6,
              "Children": []
            }
          ]
        },
        {
          "MenuId": 4,
          "MenuCode": "PAYMENT",
          "Title": "Payment",
          "Route": "/payment",
          "Icon": "account_balance_wallet",
          "SortOrder": 4,
          "Children": [
            {
              "MenuId": 15,
              "MenuCode": "PAYMENT_TRANSFER",
              "Title": "Transfer",
              "Route": "/payment/transfer",
              "Icon": null,
              "SortOrder": 1,
              "Children": []
            },
            {
              "MenuId": 16,
              "MenuCode": "PAYMENT_APPROVE",
              "Title": "Approve / Release",
              "Route": "/payment/approve",
              "Icon": null,
              "SortOrder": 2,
              "Children": []
            },
            {
              "MenuId": 17,
              "MenuCode": "PAYMENT_HISTORY",
              "Title": "History",
              "Route": "/payment/history",
              "Icon": null,
              "SortOrder": 3,
              "Children": []
            }
          ]
        },
        {
          "MenuId": 5,
          "MenuCode": "USERS",
          "Title": "Users",
          "Route": "/users",
          "Icon": "groups",
          "SortOrder": 5,
          "Children": [
            {
              "MenuId": 18,
              "MenuCode": "USERS_MANAGE",
              "Title": "Manage Users",
              "Route": "/users/manage-users",
              "Icon": null,
              "SortOrder": 1,
              "Children": []
            },
            {
              "MenuId": 19,
              "MenuCode": "USERS_ASSIGN_ACCOUNTS",
              "Title": "Assign Accounts",
              "Route": "/users/assign-accounts",
              "Icon": null,
              "SortOrder": 2,
              "Children": []
            }
          ]
        },
        {
          "MenuId": 6,
          "MenuCode": "SETTINGS",
          "Title": "Settings",
          "Route": "/settings",
          "Icon": "settings",
          "SortOrder": 6,
          "Children": [
            {
              "MenuId": 20,
              "MenuCode": "SETTINGS_PROFILE",
              "Title": "Profile",
              "Route": "/settings/profile",
              "Icon": null,
              "SortOrder": 1,
              "Children": []
            },
            {
              "MenuId": 21,
              "MenuCode": "SETTINGS_CHANGE_PASSWORD",
              "Title": "Change Password",
              "Route": "/settings/change-password",
              "Icon": null,
              "SortOrder": 2,
              "Children": []
            },
            {
              "MenuId": 22,
              "MenuCode": "SETTINGS_TICKET",
              "Title": "Send Ticket",
              "Route": "/settings/send-ticket",
              "Icon": null,
              "SortOrder": 3,
              "Children": []
            },
            {
              "MenuId": 23,
              "MenuCode": "SETTINGS_LOGOUT",
              "Title": "Logout",
              "Route": "/settings/logout",
              "Icon": null,
              "SortOrder": 4,
              "Children": []
            }
          ]
        }
      ]
    };

    // Initialize menu data with UI state
    this.menuData = apiResponse.Data.map(menu => ({
      ...menu,
      expanded: true,
      checked: false,
      indeterminate: false,
      CanView: false,
      CanCreate: false,
      CanEdit: false,
      CanDelete: false,
      CanApprove: false,
      Children: menu.Children.map(child => ({
        ...child,
        checked: false,
        CanView: false,
        CanCreate: false,
        CanEdit: false,
        CanDelete: false,
        CanApprove: false
      }))
    }));
  }

  toggleMenuExpansion(menu: MenuItem) {
    menu.expanded = !menu.expanded;
  }

  toggleMenuCheck(menu: MenuItem, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    menu.checked = checkbox.checked;
    menu.indeterminate = false;

    // Update all children
    if (menu.Children && menu.Children.length > 0) {
      this.updateChildrenCheckState(menu.Children, checkbox.checked);
    }

    // Update parent state if needed
    this.updateParentCheckState();
  }

  private updateChildrenCheckState(children: MenuItem[], checked: boolean) {
    children.forEach(child => {
      child.checked = checked;
      child.indeterminate = false;
      if (child.Children && child.Children.length > 0) {
        this.updateChildrenCheckState(child.Children, checked);
      }
    });
  }

  private updateParentCheckState() {
    // This would update parent indeterminate states based on children
    // For simplicity, implementing basic version
    this.menuData.forEach(menu => {
      if (menu.Children && menu.Children.length > 0) {
        const checkedChildren = menu.Children.filter(c => c.checked).length;
        if (checkedChildren === 0) {
          menu.checked = false;
          menu.indeterminate = false;
        } else if (checkedChildren === menu.Children.length) {
          menu.checked = true;
          menu.indeterminate = false;
        } else {
          menu.checked = false;
          menu.indeterminate = true;
        }
      }
    });
  }

  filterRoles(searchTerm: string | null) {
    const term = (searchTerm || '').toLowerCase();
    this.filteredRoles = this.roles.filter(role => 
      role.name.toLowerCase().includes(term) || 
      role.description.toLowerCase().includes(term)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRoles.length / this.itemsPerPage);
  }

  get paginatedRoles(): Role[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRoles.slice(start, end);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  resetSearch() {
    this.searchForm.reset();
    this.filteredRoles = this.roles;
    this.currentPage = 1;
    this.updatePagination();
  }

  openCreateModal() {
    this.isEditMode = false;
    this.editingRoleId = null;
    this.roleForm.reset();
    this.resetPermissions();
    this.resetModalTabs();
  }

  openEditModal(role: Role) {
    console.log('Editing Role:', role.name, 'Permissions:', role.MenuPermissions);
    this.isEditMode = true;
    this.editingRoleId = role.id;
    this.roleForm.patchValue({
      name: role.name,
      description: role.description
    });
    
    // Reset all permissions first
    this.resetPermissions();
    this.resetModalTabs();

    // Map role's permissions back to menuData if they exist
    if (role.MenuPermissions && role.MenuPermissions.length > 0) {
      role.MenuPermissions.forEach(perm => {
        // Find the corresponding menu item in the recursive structure
        this.updateMenuPermissionInList(this.menuData, perm);
      });
    }

    // Force a fresh reference to trigger change detection just in case
    this.menuData = [...this.menuData];
  }

  private updateMenuPermissionInList(menus: MenuItem[], perm: any) {
    for (const menu of menus) {
      if (menu.MenuId === perm.MenuId) {
        menu.CanView = perm.CanView;
        menu.CanCreate = perm.CanCreate;
        menu.CanEdit = perm.CanEdit;
        menu.CanDelete = perm.CanDelete;
        menu.CanApprove = perm.CanApprove;
        console.log(`Mapped permissions for MenuId ${perm.MenuId}:`, menu.Title);
        return true; 
      }
      if (menu.Children && menu.Children.length > 0) {
        if (this.updateMenuPermissionInList(menu.Children, perm)) {
          return true;
        }
      }
    }
    return false;
  }

  private resetPermissions() {
    this.menuData.forEach(menu => {
      menu.CanView = false;
      menu.CanCreate = false;
      menu.CanEdit = false;
      menu.CanDelete = false;
      menu.CanApprove = false;
      
      if (menu.Children) {
        menu.Children.forEach(child => {
          child.CanView = false;
          child.CanCreate = false;
          child.CanEdit = false;
          child.CanDelete = false;
          child.CanApprove = false;
        });
      }
    });
  }

  private resetModalTabs() {
    // Reset Bootstrap tab to first tab
    setTimeout(() => {
      const firstTabEl = document.getElementById('properties-tab');
      if (firstTabEl) {
        // Trigger click on the tab button to let Bootstrap handle the switch
        firstTabEl.click();
      }
    }, 0);
  }

  openDeleteModal(role: Role) {
    this.deletingRole = role;
  }

  onSubmit() {
    if (this.roleForm.valid) {
      const formValue = this.roleForm.value;
      
      // Collect all menu permissions (parent and children)
      const menuPermissions: any[] = [];
      
      this.menuData.forEach(menu => {
        // Add parent menu if it has any permission enabled
        if (menu.CanView || menu.CanCreate || menu.CanEdit || menu.CanDelete || menu.CanApprove) {
          menuPermissions.push({
            MenuId: menu.MenuId,
            CanView: menu.CanView || false,
            CanCreate: menu.CanCreate || false,
            CanEdit: menu.CanEdit || false,
            CanDelete: menu.CanDelete || false,
            CanApprove: menu.CanApprove || false
          });
        }
        
        // Add child menus if they have any permission enabled
        if (menu.Children && menu.Children.length > 0) {
          menu.Children.forEach(child => {
            if (child.CanView || child.CanCreate || child.CanEdit || child.CanDelete || child.CanApprove) {
              menuPermissions.push({
                MenuId: child.MenuId,
                CanView: child.CanView || false,
                CanCreate: child.CanCreate || false,
                CanEdit: child.CanEdit || false,
                CanDelete: child.CanDelete || false,
                CanApprove: child.CanApprove || false
              });
            }
          });
        }
      });
      
      // Create API payload
      const apiPayload = {
        RoleName: formValue.name,
        RoleCode: formValue.name?.toUpperCase().replace(/\s+/g, '_'), // Generate role code from name
        Description: formValue.description,
        MenuPermissions: menuPermissions
      };
      
      console.log('API Payload:', JSON.stringify(apiPayload, null, 2));
      
      if (this.isEditMode && this.editingRoleId) {
        // Update existing role
        const index = this.roles.findIndex(r => r.id === this.editingRoleId);
        if (index !== -1) {
          this.roles[index] = {
            ...this.roles[index],
            name: formValue.name!,
            description: formValue.description!,
            MenuPermissions: menuPermissions // Save permissions for local "persistence"
          };
        }
        console.log('Updated role:', this.editingRoleId);
      } else {
        // Create new role
        const newRole: Role = {
          id: (this.roles.length + 1).toString(),
          name: formValue.name!,
          description: formValue.description!,
          MenuPermissions: menuPermissions // Save permissions for local "persistence"
        };
        this.roles.push(newRole);
        console.log('Created role:', newRole);
      }
      
      this.filterRoles(this.searchForm.value.search ?? '');
      this.roleForm.reset();
    }
  }

  confirmDelete() {
    if (this.deletingRole) {
      console.log('Deleting role:', this.deletingRole.id);
      this.roles = this.roles.filter(r => r.id !== this.deletingRole!.id);
      this.filterRoles(this.searchForm.value.search ?? '');
      this.deletingRole = null;
    }
  }
}
