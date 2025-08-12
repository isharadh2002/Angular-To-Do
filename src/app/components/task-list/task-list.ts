import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgClass, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, DatePipe],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

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
}
