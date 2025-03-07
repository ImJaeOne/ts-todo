import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, deleteTodo, toggleTodo } from "../services/todoService";
import { QUERY_KEY } from "../constants/queryKey";
import { Todo } from "../types/todoTypes";

export const useTodoMutation = () => {
  const useAddTodo = () => {
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

        return () =>
          queryClient.setQueryData([QUERY_KEY.TODOLIST], prevTodoList);
      },
      onSettled: (_, error, __, rollback) => {
        if (error && rollback) rollback();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOLIST] });
      },
    });

    return mutation;
  };

  const useDeleteTodo = () => {
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

        return () =>
          queryClient.setQueryData([QUERY_KEY.TODOLIST], prevTodoList);
      },
      onSettled: (_, error, __, rollback) => {
        if (error && rollback) rollback();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOLIST] });
      },
    });

    return mutation;
  };

  const useToggleTodo = () => {
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
        return () =>
          queryClient.setQueryData([QUERY_KEY.TODOLIST], prevTodoList);
      },
      onSettled: (_, error, __, rollback) => {
        if (error && rollback) rollback();
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TODOLIST] });
      },
    });

    return mutation;
  };

  return { useAddTodo, useDeleteTodo, useToggleTodo };
};
