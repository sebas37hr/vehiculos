import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalaComponent } from './principala.component';

describe('PrincipalaComponent', () => {
  let component: PrincipalaComponent;
  let fixture: ComponentFixture<PrincipalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
