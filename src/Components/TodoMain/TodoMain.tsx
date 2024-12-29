// TodoMain.jsx
import { TodoList } from "../TodoList/TodoList.tsx";
import { TodoFooter } from "../TodoFooter/TodoFooter.tsx";
import "./TodoMain.css";

export const TodoMain: React.FC = () => (
  <main className="main">
    <TodoList />
    <TodoFooter />
  </main>
);
