import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RegisterRequestDto } from './dto/request/register-request.dto';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponseDto> {
      return this.http.post<LoginResponseDto>('api/login', {email: email, password: password});
    }

    register(payload:RegisterRequestDto): Observable<LoginResponseDto> {
      return this.http.post<LoginResponseDto>('api/register', payload);
    }

    public isAuthenticated(): boolean {
      const token = localStorage.getItem('token') || undefined;
      return token !== undefined;
      // if needed, I can always request the API to check if the token is still valid
    }
}
