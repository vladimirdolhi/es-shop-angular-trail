import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  query = '';
  user$!: Observable<User | null>;

  constructor(private search: SearchService, private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  onInput() {
    this.search.set(this.query);
  }
  logout() {
    this.authService.logout();
  }
}
