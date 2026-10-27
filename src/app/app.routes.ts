import { Router, Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard , guestGuard} from './core/guards/auth-guard';
import { inject } from '@angular/core';
import { Auth } from './core/services/auth';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component : Login,
        canActivate: [guestGuard]
    },
     {
        path: 'register',
        component : Register,
        canActivate: [guestGuard]
    },
    {
        path: 'dashboard',
        component : Dashboard,
        canActivate : [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
