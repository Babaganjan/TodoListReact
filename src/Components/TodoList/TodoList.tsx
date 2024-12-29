// TodoList.tsx
import { TodoItem } from "../TodoItem/TodoItem.tsx";
import { useContext } from "react";
import { ContextWrapper } from "../../Context/ContextWrapper.tsx";
import { ContextType } from "../../Context/ContextProvider.tsx"
import "./TodoList.css";


export const TodoList: React.FC = () => {
  const { todos } = useContext(ContextWrapper) as ContextType;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
