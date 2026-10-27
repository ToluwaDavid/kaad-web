import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "../services/auth";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Auth);
    const token = inject(Auth).getToken();

    const isPublicEndpoint =  req.url.includes('/auth/login') || req.url.includes('/auth/register');

    if(!token || isPublicEndpoint) { return next(req);}

    return next(req.clone({
        setHeaders:{
            Authorization: `Bearer ${token }`
        },
    }));
}