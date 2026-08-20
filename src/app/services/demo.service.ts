import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  getMessage(): Observable<string> {
    return of('Hello from RxJS!');
  }

}