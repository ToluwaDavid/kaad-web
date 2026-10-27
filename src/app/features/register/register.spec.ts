import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '../../core/services/auth';
import { provideRouter } from '@angular/router';
import { Register } from './register';
import { of, throwError } from 'rxjs';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  const mockAuth ={
    register: vi.fn((email: string, password: string) => {
      if(email === 'deyplay@gbam.com' && password === 'supersecret123'){
        return of({ message: 'Account created! You can now sign in.' });
      } else{
        return throwError(() => new Error('Invalid registration details'));
      }
    })
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: mockAuth }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the email signal when set', () => {
    component.email.set('deyplay@gbam.com');
    expect(component.email()).toBe('deyplay@gbam.com');
  });

  it('should update the password signal when set', () => {
    component.password.set('supersecret123');
    expect(component.password()).toBe('supersecret123');
  });

  it('should show an error message on failed registration', () => {
    component.email.set('');
    component.password.set('badpassword');
    component.onSubmit();
    expect(component.message()).toBe('Registration failed: Email and password are required.');
  });

  it('should call register without any error', () => {
    component.email.set('deyplay@gbam.com');
    component.password.set('supersecret123');

    component.onSubmit();

    expect(mockAuth.register).toHaveBeenCalledWith('deyplay@gbam.com', 'supersecret123');
    expect(component.message()).toBe('Account created! You can now sign in.');
  });

});
