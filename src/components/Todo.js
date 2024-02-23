import React, { useState } from "react";

export default function Todo({ todo, deleteTodo, updateTodo, toggle }) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" checked={todo.completed} onChange={()=>toggle(todo.id)}/>
        {isEdit ? (
          <form onSubmit={e=>{
            e.preventDefault();
            updateTodo(todo.id, title)
            setIsEdit(false)
          }}>
            <input
              type="text"
              className="todo-item-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        ) : (
          <span
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}
            onDoubleClick={() => setIsEdit(true)}
          >
            {todo.title}
          </span>
        )}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
