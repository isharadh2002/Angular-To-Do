import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive], // Import router directives!
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTask {
  onSubmit() {
    // handle form logic
  }
}
