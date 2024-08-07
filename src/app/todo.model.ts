export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  isSubtask?: boolean;
  subtasks?: Todo[];
}
