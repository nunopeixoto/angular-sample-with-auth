import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from './models/login-response';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponse> {
      return this.http.post<LoginResponse>('api/login', {email: email, password: password});
    }

    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token') || undefined;
      return token !== undefined;
      // if needed, I can always request the API to check if the token is still valid
    }
}
