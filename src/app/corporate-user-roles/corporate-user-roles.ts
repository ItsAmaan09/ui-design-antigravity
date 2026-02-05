import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Role {
  id: string;
  name: string;
  description: string;
  isSystem?: boolean;
}

@Component({
  selector: 'app-corporate-user-roles',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './corporate-user-roles.html',
  styleUrl: './corporate-user-roles.scss',
})
export class CorporateUserRoles implements OnInit {
  
  // Make Math available in template
  Math = Math;
  
  roles: Role[] = [
    { id: '1', name: 'doctor', description: 'N/A' },
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

  roleForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  isEditMode = false;
  editingRoleId: string | null = null;
  deletingRole: Role | null = null;

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
  }

  openEditModal(role: Role) {
    this.isEditMode = true;
    this.editingRoleId = role.id;
    this.roleForm.patchValue({
      name: role.name,
      description: role.description
    });
  }

  openDeleteModal(role: Role) {
    this.deletingRole = role;
  }

  onSubmit() {
    if (this.roleForm.valid) {
      const formValue = this.roleForm.value;
      
      if (this.isEditMode && this.editingRoleId) {
        // Update existing role
        const index = this.roles.findIndex(r => r.id === this.editingRoleId);
        if (index !== -1) {
          this.roles[index] = {
            ...this.roles[index],
            name: formValue.name!,
            description: formValue.description!
          };
        }
        console.log('Updated role:', this.editingRoleId);
      } else {
        // Create new role
        const newRole: Role = {
          id: (this.roles.length + 1).toString(),
          name: formValue.name!,
          description: formValue.description!
        };
        this.roles.push(newRole);
        console.log('Created role:', newRole);
      }
      
      this.filterRoles(this.searchForm.value.search);
      this.roleForm.reset();
    }
  }

  confirmDelete() {
    if (this.deletingRole) {
      console.log('Deleting role:', this.deletingRole.id);
      this.roles = this.roles.filter(r => r.id !== this.deletingRole!.id);
      this.filterRoles(this.searchForm.value.search);
      this.deletingRole = null;
    }
  }
}
