import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) =>{
        const token = localStorage.getItem('token');

        if(token && !req.url.includes('/users/login') && !req.url.includes('/users/register')){
            const authReq = req.clone({
                setHeaders: {'X-Authorization': token }
            });
            return next(authReq);
        }
        return next(req);
}