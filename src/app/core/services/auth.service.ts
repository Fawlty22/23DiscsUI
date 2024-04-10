import { Injectable, WritableSignal, signal, computed, forwardRef, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, take } from 'rxjs';
import { Login } from '../models/login.interface';
import { User } from '../models/user.interface';
import {Router} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
import { DiscService } from './disc.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = `${environment.url}/login`;
  loggedIn$ = signal<boolean>(!!this.getToken() && !this.isTokenExpired(this.getToken()));
  loggedin = computed(this.loggedIn$);
  loggedInUserToken: {userId: number}| null = this.getToken() ? jwtDecode(this.getToken()!) : null;
  loggedInUser$ = signal<User>({id: this.loggedInUserToken?.userId} as User);
  loggedInUser = computed(this.loggedInUser$);

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private userService: UserService) {
    if (!this.loggedIn$()) this.logout();
  }

   login(loginData: Login) {
    this.http.post<any>(this.baseUrl, loginData).subscribe(
      authResponse => {
      this.storeToken(authResponse.access_token);
      this.loggedInUserToken = jwtDecode(this.getToken()!);

      this.userService.getUser(this.loggedInUserToken!.userId)
        .pipe(take(1))
        .subscribe(
          res => {
            console.log(res)
            this.loggedInUser$.set(res);
            this.loggedIn$.update(()=> true);
            this.router.navigate(['/collection']);
          },
          err => console.error(err)
        );
      
      
    },
      error => {
        throw new Error(error);
    });
  }

  logout() {
    // Circular dependency so fix for now is do this in navbar
    // this.discService.collection$.set([]);
    this.loggedInUser$.set({} as User);
    this.loggedIn$.set(false);

    this.loggedInUserToken = null;
    this.removeToken();
    this.router.navigate(['/login']);
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

  isTokenExpired(authToken: string | null ): boolean {
    const decodedToken = jwtDecode(authToken ?? '');
    // Check if the expiration time (exp) is less than the current time
    return decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
  }
}
