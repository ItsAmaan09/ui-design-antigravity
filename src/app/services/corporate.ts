import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompanyResponseDto {
  CompanyName: string;
  CompanyId: string;
}

export interface ApiResponse<T> {
  Data: T;
  Message: string;
  Status: boolean;
  // Add other common fields if known, but Data is critical from component usage
}

export interface AccountResponseDto {
  AccountId: string;
  AccountName: string;
  // Add other fields if needed
}

@Injectable({
  providedIn: 'root'
})
export class CorporateService {
  private baseUrl = 'https://api.example.com/'; // Placeholder

  constructor(private http: HttpClient) { }

  getCorporates(): Observable<ApiResponse<CompanyResponseDto[]>> {
    return this.http.post<ApiResponse<CompanyResponseDto[]>>(`${this.baseUrl}Company/get`, null);
  }

  getAccountsByCorporateIdAsync(payload: { CompanyId: any }): Observable<ApiResponse<AccountResponseDto[]>> {
    return this.http.post<ApiResponse<AccountResponseDto[]>>(`${this.baseUrl}Account/GetByCorporateId`, payload);
  }

  createBusiness(payload: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}Company/create`, payload);
  }
}
