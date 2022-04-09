import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RegisterRequestDto } from './dto/request/register-request.dto';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

    constructor(
      private http: HttpClient,
      private router: Router
    ) { }

    login(email: string, password: string): void {
      this.getCsrfCookie().subscribe(() => {
        this.http.post<LoginResponseDto>(environment.apiUrl + '/login', {email: email, password: password}, {withCredentials: true})
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
        this.http.post<[]>(environment.apiUrl + '/api/logout', {}, {withCredentials: true}).subscribe(() => {
          this.logoutUser();
        });
      });
    }

    register(payload:RegisterRequestDto): void {
      this.getCsrfCookie().subscribe(() => {
        this.http.post<LoginResponseDto>(environment.apiUrl + '/api/register', payload, {withCredentials: true}).subscribe(() => {
          this.router.navigate(['./auth/login']);
        });
      });
    }

    getCsrfCookie() : Observable<any> {
      return this.http.get<any>(environment.apiUrl + '/sanctum/csrf-cookie', {withCredentials: true});
    }

    public isAuthenticated(): boolean {
      return document.cookie.includes('logged_in=true');
    }

    public logoutUser() : void {
      document.cookie = 'logged_in=false; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.router.navigate(['./auth/login']);
    }

    private logUser() : void {
      let d:Date = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      document.cookie = `logged_in=true; ${expires}`;
      this.router.navigate(['./home']);
    }
}
