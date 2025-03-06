import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
} from "../services/todoService";
import { Todo } from "../types/todoTypes";

export const useGetTodoList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TODOLIST],
    queryFn: getTodos,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: Todo) => addTodo(newTodo),
    mutationKey: [QUERY_KEY.TODOLIST],
    onMutate: (newTodo: Todo) => {
      queryClient.cancelQueries({ queryKey: [QUERY_KEY.TODOLIST] });

      const prevTodoList = queryClient.getQueryData([QUERY_KEY.TODOLIST]);

      queryClient.setQueryData([QUERY_KEY.TODOLIST], (old: Todo[]) => {
        return old ? [...old, newTodo] : [newTodo];
      });

      return () => queryClient.setQueryData([QUERY_KEY.TODOLIST], prevTodoList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOLIST] });
    },
    onError: (error, _, rollback) => {
      if (rollback) rollback();
      console.error("Error adding todo:", error);
    },
  });

  return mutation;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: Todo["id"]) => deleteTodo(id),
    mutationKey: [QUERY_KEY.TODOLIST],
    onMutate: (id: Todo["id"]) => {
      queryClient.cancelQueries({ queryKey: [QUERY_KEY.TODOLIST] });

      const prevTodoList = queryClient.getQueryData([QUERY_KEY.TODOLIST]);

      queryClient.setQueryData([QUERY_KEY.TODOLIST], (old: Todo[]) =>
        old.filter((item) => item.id !== id)
      );

      return () => queryClient.setQueryData([QUERY_KEY.TODOLIST], prevTodoList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOLIST] });
    },
    onError: (error, _, rollback) => {
      if (rollback) rollback();
      console.error("Error deleting todo:", error);
    },
  });

  return mutation;
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (todo: Omit<Todo, "text">) => toggleTodo(todo),
    mutationKey: [QUERY_KEY.TODOLIST],
    onMutate: (todo: Omit<Todo, "text">) => {
      queryClient.cancelQueries({ queryKey: [QUERY_KEY.TODOLIST] });

      const prevTodoList = queryClient.getQueryData([QUERY_KEY.TODOLIST]);

      queryClient.setQueryData(
        [QUERY_KEY.TODOLIST],
        (old: Todo[] | undefined) =>
          old
            ? old.map((item) =>
                item.id === todo.id
                  ? { ...item, completed: !item.completed }
                  : item
              )
            : []
      );

      return () => queryClient.setQueryData([QUERY_KEY.TODOLIST], prevTodoList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOLIST] });
    },
    onError: (error, _, rollback) => {
      if (rollback) rollback();
      console.error("Error toggling todo:", error);
    },
  });

  return mutation;
};
