import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {jwtDecode} from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  
  function isTokenExpired(authToken: string): boolean {
    const decodedToken = jwtDecode(authToken);
    // Check if the expiration time (exp) is less than the current time
    return decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : true;
  }

  if(authToken && isTokenExpired(authToken)){
    authService.logout();
    return next(req);
  }
  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
