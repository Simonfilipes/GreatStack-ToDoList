import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, reminder, updateReminder }) => {
    const handleReminderChange = (e) => {
        updateReminder(id, e.target.value);
    };
  
  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer">
        <img
          onClick={() => {
            toggle(id);
          }}
          src={isComplete ? tick : not_tick}
          alt=""
          className="w-7"
        />
        <p
          className={`text-slate-700 ml-4 text-[17px]
            decoration-slate-500
            ${isComplete ? "line-through" : ""}`}
        >
          {text}
        </p>

        <div className="ml-auto mr-2">
          <textarea
            value={reminder || ""}
            onChange={handleReminderChange}
            maxLength={23}
            placeholder="Lembrete..."
            className="
                    w-30 h-10 px-3 py-2
                    text-center
                    text-sm text-slate-700
                    border border-slate-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition-all duration-200
                    resize-none
                    placeholder-slate-400
                    hover:border-slate-400
                    shadow-sm
                    "
          />
        </div>
      </div>

      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        alt=""
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
};

export default TodoItems;
