import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
})
export class TodoComponent implements OnInit, AfterViewInit {
  @ViewChild('newTaskInput') newTodoInput!: ElementRef<HTMLInputElement>;

  newTodoTitle: string = '';
  todos: Todo[] = [];
  errorMessage: string = '';

  focusAddTask(): void {
    this.newTodoInput.nativeElement.focus();
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) {
      this.errorMessage = 'Please enter a task.';
      return;
    }

    const duplicateTodo = this.todos.find(
      (todo) =>
        todo.title.toLowerCase() === this.newTodoTitle.trim().toLowerCase()
    );
    if (duplicateTodo) {
      this.errorMessage = '*This task already exists.';
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.newTodoTitle.trim(),
      completed: false,
    };

    this.todos.push(newTodo);
    this.newTodoTitle = '';
    this.errorMessage = '';
    this.saveTodos();
  }

  toggleTodoCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
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

  ngAfterViewInit(): void {
    this.focusAddTask();
  }

  ngOnInit(): void {
    this.loadTodos();
  }
}
