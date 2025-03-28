import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TaskService } from '../../common/services/task.service';
import { Task, TaskPriority } from '../../models/task.model';
import { SpinnerService } from '../../common/services/spinner.service';

@Component({
  selector: 'tc-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnDestroy {
  taskForm: FormGroup;
  optionsPriority = Object.values(TaskPriority);
  task: Task;
  isNew: boolean = true;
  showModal = false;

  confirm = false;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinnerService: SpinnerService,
  ) {
    this.task = new Task();
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      priority: [TaskPriority.Sooner, Validators.required],
      expirationDate: [''],
    });
    this.task.taskId = this.route.snapshot.params['id'];
    if (this.task.taskId) {
      this.isNew = false;
      this.taskService.getTaskById(this.task.taskId).subscribe((task) => {
        this.task = task;
        this.taskForm.patchValue({
          description: this.task.description,
          priority: this.task.priority,
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onSubmit(): void {
    this.spinnerService.showSpinner()
    const task = Task.fromJSON(this.taskForm.value);
    if (this.isNew) {
      this.taskService
        .createTask(task)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.spinnerService.hideSpinner();
          this.router.navigate(['/tasks']);
        });
    } else {
      this.taskService
        .updateTask(this.task.taskId, task)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(() => {
          this.spinnerService.hideSpinner();
          this.router.navigate(['/tasks']);
        });
    }
  }

  isOptionSelected(option: string): boolean {
    return this.taskForm.get('priority')?.value === option;
  }

  onCancel(): void {
    this.location.back();
  }

  onConfirm(value) {
    this.confirm = value;
    if (value) {
      this.taskService.deleteTask(this.task.taskId).subscribe({
        next: () => {
          this.showModal = false;
          this.location.back();
        },
      });
    }
    this.showModal = false;
  }

  onDelete(): void {
    this.showModal = true;
  }
}
