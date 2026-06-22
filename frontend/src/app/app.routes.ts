import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { EligibilityWizardComponent } from './components/eligibility-wizard/eligibility-wizard.component';
import { SchemeResultsComponent } from './components/scheme-results/scheme-results.component';
import { ChecklistComponent } from './components/checklist/checklist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'eligibility', component: EligibilityWizardComponent },
  { path: 'results', component: SchemeResultsComponent },
  { path: 'checklist', component: ChecklistComponent },
  { path: '**', redirectTo: '' }
];