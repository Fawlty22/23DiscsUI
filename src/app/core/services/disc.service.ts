import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disc } from '../models/disc.interface';
import { Observable, catchError } from 'rxjs';
import {environment} from '../../../environments/environment';
import { DiscSearchResult } from '../models/disc-search-result.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiscService {
  baseUrl: string = `${environment.url}/discs`;
  loggedInUser = this.authService.loggedInUser;
  constructor(private http: HttpClient, private authService: AuthService) { }

  addDiscToCollection(newDisc: Partial<Disc>): Observable<Disc> {
    return this.http.post<Disc>(this.baseUrl, newDisc)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }

  getDiscByName(discName: string):Observable<DiscSearchResult[]> {
    return this.http.get<DiscSearchResult[]>(`${this.baseUrl}/search?name=${discName}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }

  getDiscById(id:number):Observable<Disc> {
    return this.http.get<Disc>(`${this.baseUrl}/${id}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }

  getCollection(userId: number): Observable<Disc[]>{
    return this.http.get<Disc[]>(`${this.baseUrl}/collection/${userId}`)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }

  updateDisc(disc:Disc): Observable<Disc> {
    return this.http.put<Disc>(`${this.baseUrl}/${disc.id}`, disc)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }

  translateToDisc(data: DiscSearchResult): Partial<Disc> {
    
    return {
    userId: this.loggedInUser().id,
    name: data.name,
    brand: data.brand,
    category: data.category,
    speed: data.speed,
    glide: data.glide,
    turn: data.turn,
    fade: data.fade,
    flightpath: data.pic
    }
  }

}
