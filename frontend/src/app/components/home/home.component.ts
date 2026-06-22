import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToChat() { this.router.navigate(['/chat']); }
  goToEligibility() { this.router.navigate(['/eligibility']); }

  schemes = [
    {
      icon: '🏥',
      name: 'Ayushman Bharat',
      desc: 'Free health insurance up to ₹5 lakhs',
      url: 'https://pmjay.gov.in'
    },
    {
      icon: '📚',
      name: 'NSP Scholarships',
      desc: 'Scholarships for OBC/SC/ST students',
      url: 'https://scholarships.gov.in'
    },
    {
      icon: '🌾',
      name: 'PM-KISAN',
      desc: '₹6000/year for farmers',
      url: 'https://pmkisan.gov.in'
    },
    {
      icon: '🍚',
      name: 'Ration Card',
      desc: 'Subsidised food grains under NFSA',
      url: 'https://nfsa.gov.in'
    },
    {
      icon: '🏠',
      name: 'PM Awas Yojana',
      desc: 'Affordable housing for all',
      url: 'https://pmaymis.gov.in'
    },
    {
      icon: '⚡',
      name: 'PM Ujjwala',
      desc: 'Free LPG connection for women',
      url: 'https://pmuy.gov.in'
    }
  ];

  openScheme(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}