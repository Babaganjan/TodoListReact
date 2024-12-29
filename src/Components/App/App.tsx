// App.tsx
import { ContextProvider } from "../../Context/ContextProvider.tsx";
import { TodoApp } from "../TodoApp/TodoApp.tsx";

export const App: React.FC = () => {
  return (
    <ContextProvider>
      <TodoApp />
    </ContextProvider>
  );
};
