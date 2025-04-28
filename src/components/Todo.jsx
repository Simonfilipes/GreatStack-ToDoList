import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      reminder: "",
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const updateReminder = (id, newReminder) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, reminder: newReminder };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div
      className="bg-white place-self-center w-11/12 
    max-w-md flex flex-col p-4 min-h-[550px] rounded-xl min-w-[350px]"
    >
      {/* -------- title ------- */}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="icon Todo" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* --------- input box ------- */}

      <div
        className="flex items-center my-7 bg-gray-200
        rounded-full"
      >
        <input
          ref={inputRef}
          className="bg-transparent border-1 rounded-l-full outline-none
            flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add();
            }
          }}
        />
        <button
          onClick={add}
          className="rounded-r-full
            bg-rose-300 w-32 h-14 text-black text-lg
            border-black border-b-1 border-t-1 border-r-1
            transition-all font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* --------- todo list ------- */}

      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              reminder={item.reminder} // Passa o lembrete como prop
              updateReminder={updateReminder} // Passa a função de atualização
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
