import { Component, OnInit } from '@angular/core';
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
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  ngOnInit() {
    this.loadTodos();
  }

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false,
      };
      this.todos.push(newTodo);
      this.newTodoTitle = '';
      this.saveTodos();
    }
  }

  toggleTodoCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    this.saveTodos();
  }

  saveTodos() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  loadTodos() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    }
  }
}
