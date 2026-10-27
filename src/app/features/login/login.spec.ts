import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Auth} from '../../core/services/auth';
import { Login } from './login';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const mockauth = {
    login: (email: string, password: string) => {
      if (email === 'deyplay@gbam.com' && password === 'supersecret123') {
        return of({ token: 'fake-jwt-token' });
      } else {
        return throwError(() => new Error('Invalid credentials'));
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: mockauth }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
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

  it('should call onSubmit without errors', () => {
    component.email.set('deyplay@gbam.com');
    component.password.set('supersecret123');
    component.onSubmit();

    expect(component.message()).toBe('Login successful!');
    
    //expect(() => component.onSubmit()).not.toThrow();
  });
  it('should show and error message on failed login', ()=>{
    component.email.set('wrongEmail@mail.com');
    component.password.set('badpassword');
    component.onSubmit();
    expect(component.message()).toBe('Login failed: Invalid credentials');
  })

});
