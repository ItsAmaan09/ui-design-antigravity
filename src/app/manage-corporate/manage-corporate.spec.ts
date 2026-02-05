import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCorporate } from './manage-corporate';

describe('ManageCorporate', () => {
  let component: ManageCorporate;
  let fixture: ComponentFixture<ManageCorporate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCorporate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCorporate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
