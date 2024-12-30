// TodoApp.tsx
import TodoHeader from '../TodoHeader/TodoHeader';
import TodoMain from '../TodoMain/TodoMain';

import './TodoApp.css';

const TodoApp: React.FC = () => (
    <section className="todoapp">
      <TodoHeader />
      <TodoMain />
    </section>
);

export default TodoApp;
