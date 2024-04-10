import { Injectable, WritableSignal, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, take } from 'rxjs';
import { Login } from '../models/login.interface';
import { User } from '../models/user.interface';
import {Router} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
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

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    if (!this.loggedIn$()) this.logout();
  }

   login(loginData: Login) {
    this.http.post<any>(this.baseUrl, loginData).subscribe(
      authResponse => {
      this.storeToken(authResponse.access_token);
      this.userService.getUser(authResponse.access_token.userId)
        .pipe(take(1))
        .subscribe(
          res => this.loggedInUser$ = signal<User>(res),
          err => console.error(err)
        );
      this.loggedIn$.update(()=> true);
      this.router.navigate(['/collection']);

    },
      error => {
        throw new Error(error);
    });
  }

  logout() {
    this.removeToken();
    this.loggedIn$.update(() => false);
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
