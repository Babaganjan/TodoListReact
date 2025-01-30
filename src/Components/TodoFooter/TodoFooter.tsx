// TodoFooter.tsx
import React, { useState, useContext } from 'react';
import ContextWrapper from '../../Context/ContextWrapper';
import './TodoFooter.css';

// Определяем типы для контекста
interface TodoContextType {
  filterAll: () => void;
  filterActive: () => void;
  filterCompleted: () => void;
  filterClearCompleted: () => void;
  showItemsLeft: () => number;
}

const TodoFooter: React.FC = () => {
  const {
    filterAll,
    filterActive,
    filterCompleted,
    filterClearCompleted,
    showItemsLeft,
  } = useContext(ContextWrapper) as TodoContextType;

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAllTodos = () => {
    filterAll();
    setActiveFilter('all');
  };

  const handleActiveTodos = () => {
    filterActive();
    setActiveFilter('active');
  };

  const handleCompletedTodos = () => {
    filterCompleted();
    setActiveFilter('completed');
  };

  const handleClearCompleted = () => {
    filterClearCompleted();
  };

  return (
    <footer className="footer">
      <span className="todo-count">{`Items left: ${showItemsLeft()}`}</span>
      <ul className="filters">
        <li>
          <button
            className={activeFilter === 'all' ? 'selected' : ''}
            onClick={handleAllTodos}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={activeFilter === 'active' ? 'selected' : ''}
            onClick={handleActiveTodos}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={activeFilter === 'completed' ? 'selected' : ''}
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

export default TodoFooter;
