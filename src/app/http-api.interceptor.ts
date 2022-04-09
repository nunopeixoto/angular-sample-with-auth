import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

  constructor(
    private tokenExtractor: HttpXsrfTokenExtractor,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xsrfName = 'X-XSRF-TOKEN';
    let xsrfValue = this.tokenExtractor.getToken() as string;

    if (xsrfValue !== null && !req.headers.has(xsrfName)) {
      req = req.clone({
        headers: req.headers.set(xsrfName, xsrfValue),
      });
    }

    req = req.clone({
      withCredentials: true
    });

    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // toast session expired here
          this.authService.logoutUser();
          return;
        }

        // other error handling might come here
        return;
      }
    }));
  }
}
