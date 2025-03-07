import React, { useState } from "react";
import { type Todo } from "../types/todoTypes";
import { useTodoMutation } from "../hooks/useTodoMutation";

const baseForm = {
  id: "",
  text: "",
  completed: false,
};

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState<Todo>(baseForm);
  const { useAddTodo } = useTodoMutation();

  const { mutate: addMutation } = useAddTodo();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewTodo({
      ...newTodo,
      [id]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (newTodo.text.trim() === "") {
      return;
    }

    e.preventDefault();
    const addNewTodo = {
      ...newTodo,
      id: crypto.randomUUID(),
      completed: false,
    };

    addMutation(addNewTodo);

    setNewTodo(baseForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="text"
        value={newTodo.text}
        onChange={handleChange}
      />

      <button>Add Todo</button>
    </form>
  );
};

export default TodoForm;
