import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTask {
  constructor(private taskService: TaskService, private router: Router) { }

  onSubmit() {
    const form = document.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const due = formData.get('due') as string;

    if (title.trim()) {
      const newTask = {
        title: title.trim(),
        description: description?.trim() || '',
        completed: false
      };

      this.taskService.addTask(newTask).subscribe({
        next: () => {
          form.reset();
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Error adding task:', error);
        }
      });
    }
  }
}