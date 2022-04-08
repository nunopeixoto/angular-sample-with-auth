import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AnimalsService {

    constructor(private http: HttpClient) { }

    getAnimals() : Observable<any> {
      return this.http.get<any>('http://localhost:8000/api/animals', {withCredentials: true});
    }
}
