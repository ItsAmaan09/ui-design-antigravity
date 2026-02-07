import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CorporateData {
  id: string;
  name: string;
  code: string;
  type: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CorporateDataService {
  
  private selectedCorporateSubject = new BehaviorSubject<CorporateData | null>(null);
  public selectedCorporate$: Observable<CorporateData | null> = this.selectedCorporateSubject.asObservable();

  constructor() { }

  setSelectedCorporate(corporate: CorporateData) {
    this.selectedCorporateSubject.next(corporate);
  }

  getSelectedCorporate(): CorporateData | null {
    return this.selectedCorporateSubject.value;
  }

  clearSelectedCorporate() {
    this.selectedCorporateSubject.next(null);
  }
}
