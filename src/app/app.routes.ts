import { Routes } from '@angular/router';
import { CorporateUsersListComponent } from './corporate-users-list/corporate-users-list';
import { CorporateCustomersComponent } from './corporate-customers/corporate-customers.component';
import { CorporateUserRoles } from './corporate-user-roles/corporate-user-roles';
import { ManageCorporate } from './manage-corporate/manage-corporate';
import { AddCorporateBusinessComponent } from './corporate-customers/add-corporate-business/add-corporate-business.component';

export const routes: Routes = [
    { path: 'corporate-customers', component: CorporateCustomersComponent },
    { path: 'corporate-customers/add', component: AddCorporateBusinessComponent },
    { path: 'corporate-customers/:id/users', component: CorporateUsersListComponent },
    { path: 'corporate-customers/:id/manage', component: ManageCorporate },
    { path: 'corporate/roles', component: CorporateUserRoles },
    { path: '', redirectTo: 'corporate-customers', pathMatch: 'full' }
];
