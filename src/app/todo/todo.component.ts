import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo.model';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TaskComponent],
})
export class TodoComponent implements OnInit {
  @ViewChild('newTodoInput') newTodoInput!: ElementRef;

  newTodoTitle: string = '';
  todos: Todo[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadTodos();
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const duplicateTodo = this.todos.find(
        (todo) =>
          todo.title.toLowerCase() === this.newTodoTitle.trim().toLowerCase()
      );
      if (duplicateTodo) {
        this.errorMessage = 'This task already exists.';
        return;
      }

      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false,
        subtasks: [],
      };

      this.todos.push(newTodo);
      this.newTodoTitle = '';
      this.errorMessage = '';
      this.saveTodos();
    } else {
      this.errorMessage = 'Please enter a task.';
    }
  }

  toggleTodoCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  toggleSubtaskCompletion(task: Todo, subtask: Todo): void {
    subtask.completed = !subtask.completed;
    this.saveTodos();
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    this.saveTodos();
  }

  deleteSubtask(task: Todo, subtask: Todo): void {
    if (task.subtasks) {
      task.subtasks = task.subtasks.filter((t) => t.id !== subtask.id);
    }
    this.saveTodos();
  }

  addSubtask(todo: Todo, title: string): void {
    if (!todo.subtasks) {
      todo.subtasks = [];
    }

    const newSubtask: Todo = {
      id: Date.now(),
      title,
      completed: false,
      subtasks: [],
    };

    todo.subtasks.push(newSubtask);
    this.saveTodos();
  }

  saveTodos(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  loadTodos(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    }
  }

  get activeTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  get completedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }

  focusAddTask(event: Event): void {
    event.preventDefault();
    this.newTodoInput.nativeElement.focus();
  }
}
