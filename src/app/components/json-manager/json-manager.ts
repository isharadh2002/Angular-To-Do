import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-json-manager',
  standalone: true,
  imports: [NgIf],
  templateUrl: './json-manager.html',
  styleUrl: './json-manager.css'
})
export class JsonManagerComponent {
  exportedJson: string = '';

  constructor(private taskService: TaskService) { }

  exportToJson() {
    this.exportedJson = this.taskService.exportTasks();

    // Also trigger download
    const blob = new Blob([this.exportedJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tasks.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonString = e.target?.result as string;
        this.taskService.importTasks(jsonString).subscribe({
          next: (tasks) => {
            console.log('Tasks imported successfully:', tasks);
            alert('Tasks imported successfully!');
          },
          error: (error) => {
            console.error('Error importing tasks:', error);
            alert('Error importing tasks. Please check the JSON format.');
          }
        });
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid JSON file.');
    }
  }
}