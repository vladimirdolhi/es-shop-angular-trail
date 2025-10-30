import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  findUserByEmail(email: string): Observable<User[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<User[]>(`${this.base}/users`, { params });
  }

  createUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.base}/users`, { email, password });
  }
}
