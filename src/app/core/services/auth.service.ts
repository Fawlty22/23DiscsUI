import { Injectable, WritableSignal, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Login } from '../models/login.interface';
import { User } from '../models/user.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = `${environment.url}/login`;
  loggedInUser: User;
  loggedIn: WritableSignal<boolean> = signal(false);
  constructor(private http: HttpClient, private router: Router) { }

   login(loginData: Login) {
    const token = this.http.post<any>(this.baseUrl, loginData).subscribe(
      authResponse => {
      this.loggedIn.set(true);
      this.storeToken(authResponse.access_token);
      this.router.navigate(['/collection']);
    },
      error => {
        throw new Error(error);
    });
  }

  logout() {
    this.removeToken();
  }

  
  storeToken(token: string): void {
    localStorage.setItem('user_token', token);
  }

  
  getToken(): string | null {
    return localStorage.getItem('user_token');
  }

  
  removeToken(): void {
    localStorage.removeItem('user_token');
  }
}
