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
      this.getCsrfCookie().subscribe(() => {
        this.http.post<LoginResponseDto>('http://localhost:8000/login', {email: email, password: password}, {withCredentials: true})
          .subscribe({
            complete: () => {
              this.logUser();
            },
            error: (e) => {
              console.error(e)
            }
        });
      });
    }

    logout() : void {
      this.getCsrfCookie().subscribe(() => {
        this.http.post<[]>('http://localhost:8000/api/logout', {}, {withCredentials: true}).subscribe(() => {
          document.cookie = 'logged_in=false; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          this.router.navigate(['./auth/login']);
        });
      });
    }

    register(payload:RegisterRequestDto): void {
      this.getCsrfCookie().subscribe(() => {
        this.http.post<LoginResponseDto>('http://localhost:8000/api/register', payload, {withCredentials: true}).subscribe(() => {
          this.router.navigate(['./auth/login']);
        });
      });
    }

    getCsrfCookie() : Observable<any> {
      return this.http.get<any>('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true});
    }

    public isAuthenticated(): boolean {
      return document.cookie.includes('logged_in=true');
    }

    private logUser() : void {
      let d:Date = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      document.cookie = `logged_in=true; ${expires}`;
      this.router.navigate(['./home']);
    }
}
