import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryService } from '../../../common/services/query.service';
import { Sort } from '../../../models/sort.model';
import { TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'tc-query-bar',
  templateUrl: './query-bar.component.html',
  styleUrls: ['./query-bar.component.scss'],
})
export class QueryBarComponent implements OnInit {
  searchCurrent$: Observable<string>;
  filterCurrent$: Observable<string[]>;

  constructor(private queryService: QueryService) {}

  ngOnInit(): void {
    this.searchCurrent$ = this.queryService.search$;
    this.filterCurrent$ = this.queryService.filter$;
  }


  onSearchChange(value: string): void {
    this.queryService.updateSearch(value);
  }

  onFilterChange(values: TaskStatus[]): void {
    this.queryService.updateFilter(values);
  }
}
