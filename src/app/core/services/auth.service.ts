import { Injectable } from '@angular/core';
import { map, of, switchMap, throwError } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthStateService } from './auth-state.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authApiService: AuthApiService, private authStateService: AuthStateService) {}

  get user$() {
    return this.authStateService.user$;
  }

  login(email: string, password: string) {
    return this.authApiService.findUserByEmail(email).pipe(
      map((users) => users[0]),
      switchMap((user) => {
        if (!user || user.password !== password) {
          return throwError(() => new Error('Invalid credentials'));
        }
        this.authStateService.setUser(user);
        return of(user);
      })
    );
  }

  register(email: string, password: string) {
    return this.authApiService.findUserByEmail(email).pipe(
      switchMap((users) => {
        if (users.length) {
          return throwError(() => new Error('Email already in use'));
        }
        return this.authApiService.createUser(email, password);
      }),
      map((newUser) => {
        this.authStateService.setUser(newUser);
        return newUser;
      })
    );
  }

  logout(): void {
    this.authStateService.logout();
  }

  isAuthenticated(): boolean {
    return this.authStateService.isAuthenticated();
  }
}
