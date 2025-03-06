import { BASE_URL } from "../constants/constants";
import { Paginate, Todo } from "../types/todoTypes";

export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos?_page=1&_per_page=25`);

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  const responseData: Paginate<Todo> = await res.json();

  return responseData.data;
};

export const addTodo = async (newTodo: Todo) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) {
    throw new Error("Failed to add todos");
  }
};

export const deleteTodo = async (id: Todo["id"]) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todos");
  }
};

export const toggleTodo = async ({ id, completed }: Omit<Todo, "text">) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: !completed,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update todos");
  }
};
