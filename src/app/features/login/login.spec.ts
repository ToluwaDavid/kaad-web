import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
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
    
    expect(() => component.onSubmit()).not.toThrow();
  });

});
