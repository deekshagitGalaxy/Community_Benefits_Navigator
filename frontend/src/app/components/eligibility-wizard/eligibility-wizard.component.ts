import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BenefitsService, UserProfile } from '../../services/benefits.service';

@Component({
  selector: 'app-eligibility-wizard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './eligibility-wizard.component.html',
  styleUrl: './eligibility-wizard.component.scss'
})
export class EligibilityWizardComponent {
  isLoading = false;

  profile: UserProfile = {
    age: 0,
    gender: '',
    state: 'Karnataka',
    annualIncome: 0,
    employmentStatus: '',
    category: '',
    hasDisability: false,
    isStudent: false,
    isFarmer: false,
    familySize: 1
  };

  states = ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Andhra Pradesh',
    'Telangana', 'Kerala', 'Gujarat', 'Rajasthan', 'Uttar Pradesh',
    'Madhya Pradesh', 'Bihar', 'West Bengal', 'Delhi', 'Other'];

  categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
  employmentStatuses = ['Student', 'Employed', 'Self-Employed', 'Unemployed', 'Farmer', 'Retired'];
  genders = ['Male', 'Female', 'Other'];

  constructor(private benefitsService: BenefitsService, private router: Router) {}

  checkEligibility() {
    this.isLoading = true;
    this.benefitsService.checkEligibility(this.profile).subscribe({
      next: (res) => {
        // Store result and navigate to results page
        localStorage.setItem('eligibilityResult', JSON.stringify(res));
        localStorage.setItem('userProfile', JSON.stringify(this.profile));
        this.router.navigate(['/results']);
        this.isLoading = false;
      },
      error: () => {
        alert('Error connecting to server. Make sure backend is running!');
        this.isLoading = false;
      }
    });
  }
}