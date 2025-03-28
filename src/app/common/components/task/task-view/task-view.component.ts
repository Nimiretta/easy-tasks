import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task, TaskStatus } from '../../../../models/task.model';
import { PriorityColorDirective } from '../../../directives/priority-color.directive';
import { ResolveButtonsComponent } from '../../resolve-buttons/resolve-buttons.component';
import markdownit from 'markdown-it'

@Component({
  selector: 'tc-task-view[task]',
  standalone: true,
  imports: [CommonModule, PriorityColorDirective, ResolveButtonsComponent],
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent {
  @Input() task!: Task;
  @Input() page!: string;
  @Output() resolve = new EventEmitter<TaskStatus.Resolved | TaskStatus.Rejected>();
  @Output() edit = new EventEmitter<void>();
  md = markdownit()

  status: typeof TaskStatus = TaskStatus;

  resolveEvent(status: TaskStatus.Resolved | TaskStatus.Rejected): void {
    this.resolve.emit(status);
  }

  editEvent(): void {
    this.edit.emit();
  }
}
