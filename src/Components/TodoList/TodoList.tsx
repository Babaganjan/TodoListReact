// TodoList.tsx
import { useContext } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import ContextWrapper from '../../Context/ContextWrapper';
import { ContextType } from '../../Context/ContextProvider';
import './TodoList.css';

const TodoList: React.FC = () => {
  const { todos } = useContext(ContextWrapper) as ContextType;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
