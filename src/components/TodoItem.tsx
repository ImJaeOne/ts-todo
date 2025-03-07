import { useTodoMutation } from "../hooks/useTodoMutation";
import { Todo } from "../types/todoTypes";

const TodoItem = ({ id, text, completed }: Todo) => {
  const { useDeleteTodo, useToggleTodo } = useTodoMutation();
  const { mutate: deleteMutate } = useDeleteTodo();
  const { mutate: toggleMutate } = useToggleTodo();

  const handleDelete = (id: Todo["id"]) => {
    deleteMutate(id);
  };

  const handleToggle = ({ id, completed }: Omit<Todo, "text">) => {
    toggleMutate({ id, completed });
  };

  return (
    <li>
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {text}
      </span>
      <button onClick={() => handleToggle({ id, completed })}>
        {completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
