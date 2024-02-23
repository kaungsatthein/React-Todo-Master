import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, deleteTodo, updateTodo, toggle }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          toggle={toggle}
        />
      ))}
    </ul>
  );
}
