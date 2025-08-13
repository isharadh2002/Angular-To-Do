import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from '../models/task.model';

interface TaskData {
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class JsonFileService {
  private readonly JSON_FILE_PATH = '/assets/data/tasks.json';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private nextId = 1;

  constructor(private http: HttpClient) {
    this.loadTasksFromFile();
  }

  // Load tasks from JSON file
  private loadTasksFromFile(): void {
    this.http.get<TaskData>(this.JSON_FILE_PATH).pipe(
      map(data => data.tasks || []),
      catchError(error => {
        console.error('Error loading tasks from JSON file:', error);
        // If file doesn't exist or error, start with empty array
        return of([]);
      })
    ).subscribe(tasks => {
      this.tasksSubject.next(tasks);
      // Set next ID based on existing tasks
      this.nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    });
  }

  // Save tasks to JSON file (simulated - in real scenario you'd need a backend)
  private saveTasksToFile(tasks: Task[]): Observable<void> {
    // Note: In a real browser environment, you cannot write files directly
    // This would typically require a backend API or Node.js server
    // For demonstration, we'll just update our in-memory data
    console.log('Saving tasks to JSON file (simulated):', tasks);
    console.log('JSON data:', JSON.stringify({ tasks }, null, 2));

    // In a real implementation, you would:
    // return this.http.post('/api/save-tasks', { tasks });

    return of(void 0);
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Get single task by id
  getTask(id: number): Observable<Task> {
    return this.tasksSubject.pipe(
      map(tasks => tasks.find(t => t.id === id)!)
    );
  }

  // Add a new task
  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: this.nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const currentTasks = this.tasksSubject.value;
    const updatedTasks = [...currentTasks, newTask];

    this.tasksSubject.next(updatedTasks);
    this.saveTasksToFile(updatedTasks).subscribe();

    return of(newTask);
  }

  // Update a task
  updateTask(task: Task): Observable<Task> {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex(t => t.id === task.id);

    if (index !== -1) {
      const updatedTask = {
        ...task,
        updatedAt: new Date().toISOString()
      };

      const updatedTasks = [...currentTasks];
      updatedTasks[index] = updatedTask;

      this.tasksSubject.next(updatedTasks);
      this.saveTasksToFile(updatedTasks).subscribe();

      return of(updatedTask);
    }

    return of(task);
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter(t => t.id !== id);

    this.tasksSubject.next(updatedTasks);
    this.saveTasksToFile(updatedTasks).subscribe();

    return of(void 0);
  }

  // Mark task as complete/incomplete
  toggleTaskCompletion(task: Task): Observable<Task> {
    const updatedTask = {
      ...task,
      completed: !task.completed,
      updatedAt: new Date().toISOString()
    };
    return this.updateTask(updatedTask);
  }

  // Export current tasks as JSON (for manual saving)
  exportTasksAsJson(): string {
    const tasks = this.tasksSubject.value;
    return JSON.stringify({ tasks }, null, 2);
  }

  // Import tasks from JSON string
  importTasksFromJson(jsonString: string): Observable<Task[]> {
    try {
      const data: TaskData = JSON.parse(jsonString);
      const tasks = data.tasks || [];

      this.tasksSubject.next(tasks);
      this.nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

      return of(tasks);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return of([]);
    }
  }
}