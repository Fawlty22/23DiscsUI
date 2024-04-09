import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disc } from '../models/disc.interface';
import { Observable, catchError } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscService {
  baseUrl: string = `${environment.url}/disc`;
  constructor(private http: HttpClient) { }

  getDiscByName(discName: string):Observable<Disc> {
    return this.http.get<Disc>(this.baseUrl)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        throw error; 
      })
    );
  }


}
