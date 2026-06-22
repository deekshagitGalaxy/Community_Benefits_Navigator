import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatRequest {
  message: string;
}

export interface UserProfile {
  age: number;
  gender: string;
  state: string;
  annualIncome: number;
  employmentStatus: string;
  category: string;
  hasDisability: boolean;
  isStudent: boolean;
  isFarmer: boolean;
  familySize: number;
}

export interface ChecklistRequest {
  schemeName: string;
  applicantName: string;
  age: number;
  gender: string;
  state: string;
  category: string;
  annualIncome: number;
}

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {
  private apiUrl = 'http://localhost:5276/api';

  constructor(private http: HttpClient) {}

  askChat(message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat/ask`, { message });
  }

  checkEligibility(profile: UserProfile): Observable<any> {
    return this.http.post(`${this.apiUrl}/eligibility/check`, profile);
  }

  generateChecklist(request: ChecklistRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/checklist/generate`, request);
  }
}