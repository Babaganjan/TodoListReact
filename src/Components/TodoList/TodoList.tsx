// TodoList.tsx
import React, { useEffect, useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../Context/ContextProvider';
import './TodoList.css';

interface TodoContextType {
  todos: Todo[];
  filter: string;
}

const TodoList: React.FC<TodoContextType> = ({ todos, filter }) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (todos && Array.isArray(todos)) {
      if (filter === 'completed') {
        setFilteredTodos(todos.filter((item) => item && item.completed));
      } else if (filter === 'active') {
        setFilteredTodos(todos.filter((item) => item && !item.completed));
      } else {
        setFilteredTodos(todos.filter((item) => item));
      }
    }
  }, [filter, todos]);

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => {
        if (!todo) return null;

        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
