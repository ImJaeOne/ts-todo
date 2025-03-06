import { Paginate, Todo } from "../types/todoTypes";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch("http://localhost:4000/todos?_page=1&_per_page=25");

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data: Paginate<Todo> = await res.json();

  return data.data;
};

export const addTodo = async (newTodo: Todo): Promise<Todo[]> => {
  const res = await fetch("http://localhost:4000/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) {
    throw new Error("Failed to add todos");
  }

  const data = await res.json();

  return data;
};

export const deleteTodo = async (id: Todo["id"]): Promise<Todo[]> => {
  const res = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todos");
  }

  const data = await res.json();

  return data;
};

export const toggleTodo = async ({
  id,
  completed,
}: Omit<Todo, "text">): Promise<Todo[]> => {
  const res = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: !completed,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update todos");
  }

  const data = await res.json();

  return data;
};
