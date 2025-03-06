export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type TodoItemProps = Todo;

export type Paginate<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};
