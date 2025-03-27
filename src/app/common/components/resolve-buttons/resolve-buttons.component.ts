import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'tc-resolve-buttons[taskStatus]',
  templateUrl: './resolve-buttons.component.html',
  styleUrls: ['./resolve-buttons.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ResolveButtonsComponent {
  @Input() taskStatus!: TaskStatus;
  @Input() page: string = 'tasks';
  @Output() resolveEvent: EventEmitter<Exclude<TaskStatus, TaskStatus.Created>> = new EventEmitter();

  status = TaskStatus;

  resolve(value: Exclude<TaskStatus, TaskStatus.Created>): void {
    this.resolveEvent.emit(value);
  }

  getResolveName(): string {
    return this.page === 'assistant' ? 'Promise' : 'I did it';
  }
}
