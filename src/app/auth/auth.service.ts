import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RegisterRequestDto } from './dto/request/register-request.dto';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    constructor(
      private http: HttpClient,
      private router: Router
    ) { }

    login(email: string, password: string): void {
      this.http.post<LoginResponseDto>('http://localhost:8000/login', {email: email, password: password}, {withCredentials: true})
        .subscribe({
          complete: () => {
            let d:Date = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            let expires:string = `expires=${d.toUTCString()}`;
            document.cookie = `logged_in=true; ${expires}`;
            this.router.navigate(['./home']);
          },
          error: (e) => {
            console.error(e)
          }
      })
    }

    register(payload:RegisterRequestDto): Observable<LoginResponseDto> {
      return this.http.post<LoginResponseDto>('api/register', payload);
    }

    getCsrfCookie() : Observable<any> {
      return this.http.get<any>('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true});
    }

    public isAuthenticated(): boolean {
      return document.cookie.includes('logged_in=true');
    }
}
