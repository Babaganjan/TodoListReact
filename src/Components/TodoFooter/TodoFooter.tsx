// TodoFooter.tsx
import { useState, useContext } from "react";
import { ContextWrapper } from "../../Context/ContextWrapper.tsx";
import { ContextType } from "../../Context/ContextProvider.tsx"; // Импортируйте ваш интерйфейс ContextType

import "./TodoFooter.css";



export const TodoFooter: React.FC = () => {
  const context = useContext(ContextWrapper) as ContextType;

  // Проверка на наличие контекста
  if (!context) {
    throw new Error('TodoFooter must be used within a ContextProvider');
  }

  const {
    filterAll,
    filterActive,
    filterCompleted,
    filterClearCompleted,
    showItemsLeft,
  } = context; // Теперь вы можете использовать значение от контекста

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleAllTodos = () => {
    filterAll();
    setActiveFilter("all");
  };

  const handleActiveTodos = () => {
    filterActive();
    setActiveFilter("active");
  };

  const handleCompletedTodos = () => {
    filterCompleted();
    setActiveFilter("completed");
  };

  const handleClearCompleted = () => {
    filterClearCompleted();
  };

  return (
    <footer className="footer">
      <span className="todo-count">Items left: {showItemsLeft()}</span>
      <ul className="filters">
        <li>
          <button
            className={activeFilter === "all" ? "selected" : ""}
            onClick={handleAllTodos}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={activeFilter === "active" ? "selected" : ""}
            onClick={handleActiveTodos}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={handleCompletedTodos}
          >
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};
