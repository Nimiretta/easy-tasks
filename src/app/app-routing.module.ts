import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './common/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'assistant',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/assistant/assistant.module').then((m) => m.AssistantModule),
  },
  {
    path: 'editor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
