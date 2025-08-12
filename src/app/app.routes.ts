import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { AddTask } from './components/add-task/add-task';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/active', component: TaskListComponent, data: { filter: 'active' } },
  { path: 'tasks/completed', component: TaskListComponent, data: { filter: 'completed' } },
  { path: 'add', component: AddTask },

];
