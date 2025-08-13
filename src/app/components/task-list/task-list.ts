import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgClass, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, DatePipe],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.filter = data['filter'] || 'all';
      this.loadTasks();
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      if (this.filter === 'active') {
        this.tasks = tasks.filter(task => !task.completed);
      } else if (this.filter === 'completed') {
        this.tasks = tasks.filter(task => task.completed);
      } else {
        this.tasks = tasks;
      }
    });
  }

  toggleTask(task: Task) {
    this.taskService.toggleTaskCompletion(task).subscribe({
      next: () => {
        this.loadTasks(); // Refresh the list
      },
      error: (error) => {
        console.error('Error toggling task:', error);
      }
    });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }
}