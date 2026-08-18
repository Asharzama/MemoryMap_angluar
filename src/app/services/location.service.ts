import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocationResult } from '../models/location-result';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private http = inject(HttpClient);

  searchLocation(query: string): Observable<LocationResult[]> {

    const params = new HttpParams()
      .set('q', query)
      .set('format', 'json')
      .set('limit', '5');

    return this.http.get<LocationResult[]>(
      'https://nominatim.openstreetmap.org/search',
      { params }
    );
  }
}