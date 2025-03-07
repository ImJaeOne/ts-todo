import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import { getTodos } from "../services/todoService";

export const useGetTodoList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TODOLIST],
    queryFn: getTodos,
  });
};
