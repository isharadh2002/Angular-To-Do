import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTask {
  title = '';
  description = '';
  dueDate = '';

  constructor(private taskService: TaskService, private router: Router) { }

  onSubmit() {
    if (this.title.trim()) {
      this.taskService.addTask({
        title: this.title.trim(),
        description: this.description.trim()
      }).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}