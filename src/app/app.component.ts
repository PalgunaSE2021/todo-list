import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
