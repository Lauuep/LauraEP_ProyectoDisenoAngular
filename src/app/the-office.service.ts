import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export interface theOffice {
  season: string;
  episode: string;
  title: string;
  description: string;
  imdbRating: string;
}

@Injectable({
  providedIn: 'root'
})
export class TheOfficeService {
  private baseUrl: string = "https://officeapi.akashrajpurohit.com/season/5"
  theOffice;

  constructor(private http: HttpClient) { 
    this.theOffice = toSignal(
      this.http.get<theOffice[]>(this.baseUrl).pipe(map(data => data.slice(0, 15))),
      { initialValue: [] }
    );  
  }

  getTheOffice() {
    return this.http.get<theOffice[]>(this.baseUrl).pipe(map(data => data.slice(0, 15)));
  }
}

