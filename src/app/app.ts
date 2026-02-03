import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CorporateCustomersComponent } from './corporate-customers/corporate-customers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CorporateCustomersComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ui-design-admin-portal');
}
