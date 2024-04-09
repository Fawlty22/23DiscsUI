import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disc } from '../models/disc.interface';
import { Observable, catchError } from 'rxjs';
import {environment} from '../../../environments/environment';
import { DiscSearchResult } from '../models/disc-search-result.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscService {
  baseUrl: string = `${environment.url}/discs`;
  constructor(private http: HttpClient) { }

  getDiscByName(discName: string):Observable<DiscSearchResult[]> {
    return this.http.get<DiscSearchResult[]>(`${this.baseUrl}/search?name=${discName}`)
    // .pipe(
    //   catchError(error => {
    //     console.error('Error fetching data:', error);
    //     throw error; 
    //   })
    // );
  }


}
