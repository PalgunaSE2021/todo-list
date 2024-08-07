import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskComponent {
  @Input() todo!: Todo;
  @Input() isSubtask: boolean = false;
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() toggleSubtask = new EventEmitter<Todo>();
  @Output() deleteSubtask = new EventEmitter<Todo>();
  @Output() addSubtask = new EventEmitter<string>();

  newSubtaskTitle: string = '';

  onToggle(): void {
    this.toggle.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }

  onToggleSubtask(subtask: Todo): void {
    this.toggleSubtask.emit(subtask);
  }

  onDeleteSubtask(subtask: Todo): void {
    this.deleteSubtask.emit(subtask);
  }

  onAddSubtask(): void {
    if (this.newSubtaskTitle.trim()) {
      this.addSubtask.emit(this.newSubtaskTitle.trim());
      this.newSubtaskTitle = '';
    }
  }
}
