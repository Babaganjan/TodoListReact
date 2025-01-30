// TodoMain.tsx
import React, { useContext } from 'react';
import TodoList from '../TodoList/TodoList';
import TodoFooter from '../TodoFooter/TodoFooter';
import ContextWrapper from '../../Context/ContextWrapper';
import { TodoContextType } from '../../Context/ContextProvider';
import './TodoMain.css';

const TodoMain: React.FC = () => {
  const { todos, filter } = useContext(ContextWrapper) as TodoContextType;

  return (
    <main className="main">
      <TodoList filter={filter} todos={todos} />
      <TodoFooter />
    </main>
  );
};

export default TodoMain;
