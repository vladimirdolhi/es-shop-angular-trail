import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly search$ = new BehaviorSubject<string>('');
  set(query: string) {
    this.search$.next(query);
  }
}
