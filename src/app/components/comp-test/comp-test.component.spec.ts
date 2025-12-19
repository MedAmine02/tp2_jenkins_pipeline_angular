import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompTestComponent } from './comp-test.component';

describe('CompTestComponent', () => {
  let component: CompTestComponent;
  let fixture: ComponentFixture<CompTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
