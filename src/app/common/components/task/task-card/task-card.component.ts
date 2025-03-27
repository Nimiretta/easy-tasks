import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Task, TaskStatus } from '../../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskViewComponent } from '../task-view/task-view.component';

@Component({
  selector: 'tc-task-card[task]',
  templateUrl: './task-card.component.html',
  imports: [CommonModule, TaskViewComponent],
  standalone: true,
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() page!: string;
  @Output() resolve = new EventEmitter<Task>();
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  resolveEvent(status: TaskStatus.Resolved | TaskStatus.Rejected): void {
    this.task.resolveTask(status);
    this.taskService
      .updateTask(this.task.taskId, this.task)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.resolve.emit(this.task);
      });
  }

  onEdit(): void {
    this.router.navigate(['/editor/', this.task.taskId]);
  }

  // TODO
  // onDestroy()
}
