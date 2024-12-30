// TodoMain.jsx
import TodoList from '../TodoList/TodoList';
import TodoFooter from '../TodoFooter/TodoFooter';
import './TodoMain.css';

const TodoMain: React.FC = () => (
  <main className="main">
    <TodoList />
    <TodoFooter />
  </main>
);

export default TodoMain;
