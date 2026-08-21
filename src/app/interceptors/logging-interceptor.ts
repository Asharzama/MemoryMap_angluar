import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';

import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP Request:', req.method, req.url);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log('HTTP Response:', event.status, req.url);
      }
    }),
  );
};
