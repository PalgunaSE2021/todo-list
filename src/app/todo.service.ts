import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId: number = 1;

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    const newTodo: Todo = { id: this.nextId++, title, completed: false };
    this.todos.push(newTodo);
  }

  toggleTodoCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
  }
}
