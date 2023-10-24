import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInPageComponent } from './signed-in-page.component';

describe('SignedInPageComponent', () => {
  let component: SignedInPageComponent;
  let fixture: ComponentFixture<SignedInPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignedInPageComponent]
    });
    fixture = TestBed.createComponent(SignedInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
