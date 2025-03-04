// App.tsx
import ContextProvider from '../../Context/ContextProvider';
import TodoApp from '../TodoApp/TodoApp';

const App: React.FC = () => (
  <ContextProvider>
    <TodoApp />
  </ContextProvider>
);

export default App;
