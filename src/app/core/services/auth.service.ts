import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, throwError } from 'rxjs';
import { User } from '../../shared/models/user';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = 'http://localhost:3000';
  private readonly KEY = 'auth_user';

  readonly user$ = new BehaviorSubject<User | null>(this.retrieveStoredUser());

  constructor(private http: HttpClient) {}

  private retrieveStoredUser(): User | null {
    const raw = localStorage.getItem(this.KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  private setUser(user: User | null) {
    this.user$.next(user);
    if (user) localStorage.setItem(this.KEY, JSON.stringify(user));
    else localStorage.removeItem(this.KEY);
  }

  login(email: string, password: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get<User[]>(`${this.base}/users`, { params }).pipe(
      map((users) => users[0]),
      switchMap((user) => {
        if (!user || user.password !== password) {
          return throwError(() => new Error('Invalid credentials'));
        }
        this.setUser(user);
        return of(user);
      })
    );
  }

  register(email: string, password: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get<User[]>(`${this.base}/users`, { params }).pipe(
      switchMap((users) => {
        if (users.length) {
          return throwError(() => new Error('Email already in use'));
        }
        return this.http.post<User>(`${this.base}/users`, { email, password });
      }),
      map((newUser) => {
        this.setUser(newUser);
        return newUser;
      })
    );
  }

  logout() {
    this.setUser(null);
  }

  isAuthenticated(): boolean {
    return !!this.user$.value;
  }
}
