import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserRoles } from './corporate-user-roles';

describe('CorporateUserRoles', () => {
  let component: CorporateUserRoles;
  let fixture: ComponentFixture<CorporateUserRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateUserRoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateUserRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
