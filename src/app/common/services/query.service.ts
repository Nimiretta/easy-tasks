import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, Observable } from 'rxjs';

import { SortOptionApiName } from '../../models/sort.model';
import { TaskStatus } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable().pipe(debounceTime(1000));

  private filterSubject: BehaviorSubject<TaskStatus[]> = new BehaviorSubject<TaskStatus[]>([TaskStatus.Created]);
  filter$ = this.filterSubject.asObservable();

  private refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  private refresh$ = this.refreshSubject.asObservable();

  combined$: Observable<[void, string, TaskStatus[]]>;

  constructor() {
    this.combined$ = combineLatest([this.refresh$, this.search$, this.filter$]);
  }

  updateSearch(search: string): void {
    this.searchSubject.next(search);
  }

  updateFilter(filter: TaskStatus[]): void {
    this.filterSubject.next(filter);
  }

  refreshQuery(): void {
    this.refreshSubject.next();
  }
}
