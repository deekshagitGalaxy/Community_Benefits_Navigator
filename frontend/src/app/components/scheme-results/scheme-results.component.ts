import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
import { BenefitsService } from '../../services/benefits.service';

@Component({
  selector: 'app-scheme-results',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MarkdownModule
  ],
  templateUrl: './scheme-results.component.html',
  styleUrl: './scheme-results.component.scss'
})
export class SchemeResultsComponent implements OnInit {
  rawResult: any = null;
  profile: any = null;
  dynamicSchemes: string[] = [];

  constructor(private router: Router, private benefitsService: BenefitsService) {}

  ngOnInit() {
    const stored = localStorage.getItem('eligibilityResult');
    const profile = localStorage.getItem('userProfile');
    if (stored) {
      this.rawResult = JSON.parse(stored);
      this.extractSchemeNames(this.rawResult.schemes);
    }
    if (profile) this.profile = JSON.parse(profile);
  }

  extractSchemeNames(schemesText: string) {
    if (!schemesText) return;

    const lines = schemesText.split('\n');
    const schemes: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();

      // Match numbered lines like "1. Scheme Name" or "**Scheme Name**"
      const numberedMatch = trimmed.match(/^\d+\.\s+\*{0,2}(.+?)\*{0,2}$/);
      // Match bold scheme names like "**Scheme Name**"
      const boldMatch = trimmed.match(/^\*\*(.+?)\*\*$/);
      // Match "Scheme Name:" pattern
      const colonMatch = trimmed.match(/^[-•]\s*\*{0,2}Scheme Name\*{0,2}:\s*(.+)$/i);

      if (colonMatch) {
        const name = colonMatch[1].replace(/\*\*/g, '').trim();
        if (name.length > 5 && name.length < 80 && !schemes.includes(name))
          schemes.push(name);
      } else if (numberedMatch) {
        const name = numberedMatch[1].replace(/\*\*/g, '').trim();
        if (name.length > 5 && name.length < 80 && !schemes.includes(name))
          schemes.push(name);
      } else if (boldMatch) {
        const name = boldMatch[1].replace(/\*\*/g, '').trim();
        if (name.length > 5 && name.length < 80 && !schemes.includes(name))
          schemes.push(name);
      }
    }

    // Take top 5 unique schemes
    this.dynamicSchemes = schemes.slice(0, 5);

    // Fallback if parsing fails
    if (this.dynamicSchemes.length === 0) {
      this.dynamicSchemes = [
        'Ayushman Bharat (PM-JAY)',
        'NSP Scholarship for ST Students',
        'Ration Card under NFSA',
        'PM Awas Yojana',
        'MGNREGA'
      ];
    }
  }

  goBack() { this.router.navigate(['/eligibility']); }
  goHome() { this.router.navigate(['/']); }

  getChecklist(schemeName: string) {
    localStorage.setItem('selectedScheme', schemeName);
    localStorage.setItem('userProfile', JSON.stringify(this.profile));
    this.router.navigate(['/checklist']);
  }
}