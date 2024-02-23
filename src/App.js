import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFiltertedTodos] = useState(todos);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFiltertedTodos(todos);
      });
  }, []);
  const addTodo = (todo) => {
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos([...todos, todo]);
  };
  const deleteTodo = (todoId) => {
    fetch(`http://localhost:3001/todos/${todoId}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };
  const updateTodo = (todoId, title) => {
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) todo.title = title;
        return todo;
      })
    );
  };
  const checkAll = () => {
    todos.forEach((todo) => {
      fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });
    });
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };
  const clearCompleted = () => {
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
    setTodos(todos.filter((todo) => !todo.completed));
  };
  const toggle = (todoId) => {
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === todoId).completed,
      }),
    });
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      })
    );
  };
  const filterBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setFiltertedTodos(todos);
      }
      if (filter === "Active") {
        setFiltertedTodos(todos.filter((todo) => !todo.completed));
      }
      if (filter === "Completed") {
        setFiltertedTodos(todos.filter((todo) => todo.completed));
      }
    },
    [todos]
  );
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          toggle={toggle}
        />
        <CheckAllAndRemaining
          remainingCount={todos.filter((todo) => !todo.completed).length}
          checkAll={checkAll}
        />
        <div className="other-buttons-container">
          <TodoFilters filterBy={filterBy} />
          <ClearCompletedBtn clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
