import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private readonly KEY = 'auth_user';

  readonly user$ = new BehaviorSubject<User | null>(this.readStoredUser());

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(this.KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  setUser(user: User | null): void {
    this.user$.next(user);
    if (user) localStorage.setItem(this.KEY, JSON.stringify(user));
    else localStorage.removeItem(this.KEY);
  }

  logout(): void {
    this.setUser(null);
  }

  isAuthenticated(): boolean {
    return !!this.user$.value;
  }
}
