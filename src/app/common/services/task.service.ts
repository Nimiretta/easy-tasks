import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/enviroment';
import { Task, TaskStatus } from '../../models/task.model';
import { QueryService } from './query.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}tasks/`;
  constructor(
    private http: HttpClient,
    private queryService: QueryService
  ) {}

  getTasks(
    filter: TaskStatus[] = [TaskStatus.Created],
    search?: string
  ): Observable<Task[]> {
    const params = new URLSearchParams();
    params.append('filter', filter.join(','));

    if (search) {
      params.append('search', search);
    }

    return this.http.get<Task[]>(this.apiUrl + `?${params.toString()}`).pipe(
      map((results) => results.map(Task.fromJSON))
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + `${id}`).pipe(map(Task.fromJSON));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task[]>(this.apiUrl, task).pipe(map(Task.fromJSON));
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.patch<Task[]>(this.apiUrl + `${id}`, task).pipe(map(Task.fromJSON));
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `${id}/`);
  }
}
