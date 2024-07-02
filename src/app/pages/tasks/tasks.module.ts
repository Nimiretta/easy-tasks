import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskCardComponent } from '../../common/components/task/task-card/task-card.component';
import { TasksComponent } from './tasks/tasks.component';
import { QueryBarComponent } from './query-bar/query-bar.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
];

@NgModule({
  declarations: [TasksComponent, QueryBarComponent],
  imports: [CommonModule, TaskCardComponent, RouterModule.forChild(routes)],
  exports: [],
})
export class TasksModule {}
