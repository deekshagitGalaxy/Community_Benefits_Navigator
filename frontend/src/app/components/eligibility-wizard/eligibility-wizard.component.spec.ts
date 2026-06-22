import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibilityWizardComponent } from './eligibility-wizard.component';

describe('EligibilityWizardComponent', () => {
  let component: EligibilityWizardComponent;
  let fixture: ComponentFixture<EligibilityWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EligibilityWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EligibilityWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
