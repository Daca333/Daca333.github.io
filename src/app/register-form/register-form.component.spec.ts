import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterBoxComponent } from './register-form.component';

describe('RegisterBoxComponent', () => {
  let component: RegisterBoxComponent;
  let fixture: ComponentFixture<RegisterBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBoxComponent]
    });
    fixture = TestBed.createComponent(RegisterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
