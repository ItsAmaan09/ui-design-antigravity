import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CompanyResponseDto {
  CompanyName: string;
  CompanyId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor() { }

  getCorporates(): Observable<{ Data: CompanyResponseDto[] }> {
    const mockData: CompanyResponseDto[] = [
      { CompanyName: 'Dahabshiil Business Services', CompanyId: 'DBS' },
      { CompanyName: 'Hormuud Telecom', CompanyId: 'HRM' },
      { CompanyName: 'Somali Electricity', CompanyId: 'SEC' },
      { CompanyName: 'IBS Bank', CompanyId: 'IBS' },
      { CompanyName: 'Premier Bank', CompanyId: 'PBB' },
      { CompanyName: 'Somtel', CompanyId: 'SMT' },
      { CompanyName: 'Golis Telecom', CompanyId: 'GOL' }
    ];

    return of({ Data: mockData }).pipe(delay(500));
  }
}
