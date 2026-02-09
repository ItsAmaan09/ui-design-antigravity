import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-corporate-business',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-corporate-business.component.html',
  styleUrls: ['./add-corporate-business.component.scss']
})
export class AddCorporateBusinessComponent {
  cifNumber: string = '';

  onSearch() {
    console.log('Searching for CIF:', this.cifNumber);
    // Future implementation: Search logic
  }
}
