import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { BenefitsService } from '../../services/benefits.service';

interface CheckItem {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss'
})
export class ChecklistComponent implements OnInit {
  schemeName = '';
  isLoading = false;
  result: any = null;
  documents: CheckItem[] = [];
  steps: CheckItem[] = [];

  constructor(private benefitsService: BenefitsService, private router: Router) {}

  ngOnInit() {
    const scheme = localStorage.getItem('selectedScheme');
    const profile = localStorage.getItem('userProfile');

    if (scheme && profile) {
      this.schemeName = scheme;
      const p = JSON.parse(profile);
      this.loadChecklist(scheme, p);
    }
  }

  loadChecklist(scheme: string, profile: any) {
    this.isLoading = true;
    this.benefitsService.generateChecklist({
      schemeName: scheme,
      applicantName: 'Applicant',
      age: profile.age,
      gender: profile.gender,
      state: profile.state,
      category: profile.category,
      annualIncome: profile.annualIncome
    }).subscribe({
      next: (res) => {
        this.result = res;
        this.parseChecklist(res.rawChecklist);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Error loading checklist. Please try again.');
      }
    });
  }

  parseChecklist(raw: string) {
    const lines = raw.split('\n');
    let section = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.includes('DOCUMENTS NEEDED')) { section = 'docs'; continue; }
      if (trimmed.includes('APPLICATION STEPS')) { section = 'steps'; continue; }
      if (trimmed.includes('IMPORTANT TIPS')) { section = 'tips'; continue; }
      if (trimmed.includes('HELPLINE') || trimmed.includes('ESTIMATED')) { section = ''; continue; }

      const cleaned = trimmed
        .replace(/\*\*/g, '')
        .replace(/^#+\s*/, '')
        .replace(/^\d+\.\s*/, '')
        .trim();

      if (!cleaned || cleaned.length < 3) continue;

      if (section === 'docs') this.documents.push({ text: cleaned, done: false });
      else if (section === 'steps') this.steps.push({ text: cleaned, done: false });
    }
  }

  get docsProgress() {
    if (!this.documents.length) return 0;
    return (this.documents.filter(d => d.done).length / this.documents.length) * 100;
  }

  get stepsProgress() {
    if (!this.steps.length) return 0;
    return (this.steps.filter(s => s.done).length / this.steps.length) * 100;
  }

  get docsCompleted() {
    return this.documents.filter(d => d.done).length;
  }

  get stepsCompleted() {
    return this.steps.filter(s => s.done).length;
  }

  goBack() { this.router.navigate(['/results']); }
  goHome() { this.router.navigate(['/']); }
}