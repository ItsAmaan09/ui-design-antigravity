import { Routes } from '@angular/router';
import { CorporateUsersListComponent } from './corporate-users-list/corporate-users-list';
import { CorporateCustomersComponent } from './corporate-customers/corporate-customers.component';

export const routes: Routes = [
    { path: 'corporate-customers', component: CorporateCustomersComponent },
    { path: 'corporate-customers/:id/users', component: CorporateUsersListComponent },
    { path: '', redirectTo: 'corporate-customers', pathMatch: 'full' }
];
