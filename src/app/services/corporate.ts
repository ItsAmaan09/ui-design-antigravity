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

@Injectable({
  providedIn: 'root'
})
export class CorporateService {
  private baseUrl = 'https://api.example.com/'; // Placeholder, should be environment config

  constructor(private http: HttpClient) { }

  getCorporates(): Observable<ApiResponse<CompanyResponseDto[]>> {
    return this.http.post<ApiResponse<CompanyResponseDto[]>>(`${this.baseUrl}Company/get`, null);
  }
}
