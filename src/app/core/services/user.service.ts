import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable, catchError, tap} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // TODO: update
  baseUrl: string = `${environment.url}/users`;
  constructor(private http: HttpClient) {}

  getUser(userId: number):Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, newUser)
    .pipe(
      catchError(error => {
        console.error('Error updateing user:', error);
        throw error; 
      })
    );
  }

  updateUser(user: Partial<User>):Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user)
    .pipe(
      catchError(error => {
        console.error('Error updateing user:', error);
        throw error; 
      })
    );
  }

  deleteUser(userId: string):Observable<User> {
    return this.http.delete<User>(this.baseUrl)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }

}
