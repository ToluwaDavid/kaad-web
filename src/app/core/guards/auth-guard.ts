import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () =>{
    const auth = inject(Auth);
    const router = inject(Router);


    if(auth.isLoggedIn()) {return true;}
    return router.createUrlTree(['/login']);
}

export const guestGuard: CanActivateFn = () =>{
    const auth = inject(Auth);
    const router = inject(Router);

    if(auth.isLoggedIn()){
        return router.createUrlTree(['/dashboard'])
    };
    return true;
}