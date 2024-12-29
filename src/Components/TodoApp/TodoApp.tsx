// TodoApp.tsx
import { TodoHeader } from "../TodoHeader/TodoHeader.tsx";
import { TodoMain } from "../TodoMain/TodoMain.tsx";

import "./TodoApp.css";

export const TodoApp: React.FC = () => {
  return (
    <section className="todoapp">
      <TodoHeader />
      <TodoMain />
    </section>
  );
};
