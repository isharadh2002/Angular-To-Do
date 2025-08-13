import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { JsonFileService } from './json-file.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private jsonFileService: JsonFileService) { }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.jsonFileService.getTasks();
  }

  // Get single task by id
  getTask(id: number): Observable<Task> {
    return this.jsonFileService.getTask(id);
  }

  // Add a new task
  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    return this.jsonFileService.addTask(task);
  }

  // Update a task
  updateTask(task: Task): Observable<Task> {
    return this.jsonFileService.updateTask(task);
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    return this.jsonFileService.deleteTask(id);
  }

  // Mark task as complete/incomplete
  toggleTaskCompletion(task: Task): Observable<Task> {
    return this.jsonFileService.toggleTaskCompletion(task);
  }

  // Export tasks as JSON
  exportTasks(): string {
    return this.jsonFileService.exportTasksAsJson();
  }

  // Import tasks from JSON
  importTasks(jsonString: string): Observable<Task[]> {
    return this.jsonFileService.importTasksFromJson(jsonString);
  }
}