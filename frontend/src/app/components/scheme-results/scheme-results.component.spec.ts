import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeResultsComponent } from './scheme-results.component';

describe('SchemeResultsComponent', () => {
  let component: SchemeResultsComponent;
  let fixture: ComponentFixture<SchemeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemeResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchemeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
