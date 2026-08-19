import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private http = inject(HttpClient);

  uploadTrip(data: FormData): Observable<unknown> {

    return this.http.post(
      'https://httpbin.org/post',
      data
    );

  }
}