// ContextWrapper.tsx
import React, {
  useState, useEffect, ReactNode,
} from 'react';
import ContextWrapper from './ContextWrapper';

export interface Todo {
  id: number;
  description: string;
  timer: {
    totalSeconds: number;
  };
  created: Date;
  completed: boolean;
  isRunning: boolean;
}

// Определяем интерфейс для контекста
export interface TodoContextType {
  onAdd: (description: string, min: string, sec: string) => void;
  todos: Todo[];
  changeTodoTimer: (id: number) => void;
  onChange: (id: number, newDescription: string) => void;
  onDelete: (id: number) => void;
  onChecked: (id: number) => void;
  filterAll: () => void;
  filterActive: () => void;
  filterCompleted: () => void;
  filterClearCompleted: () => void;
  startTimer: (id: number) => void;
  pauseTimer: (id: number) => void;
  filter: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  showItemsLeft: () => number;
  min: string;
  setMin: (value: string) => void;
  sec: string;
  setSec: (value: string) => void;
  isRunning: boolean | null;
  setIsRunning: (value: boolean | null) => void;
}

// Провайдер контекста
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [inputValue, setInputValue] = useState<string>('');
  const [min, setMin] = useState<string>('');
  const [sec, setSec] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean | null>(null);

  const addTodo = (description: string, minutes: string, secundes: string) => {
    const totalSeconds = (minutes ? parseInt(minutes, 10) : 0) * 60
    + (sec ? parseInt(secundes, 10) : 0);
    const newTodo: Todo = {
      id: Date.now(),
      description,
      timer: {
        totalSeconds,
      },
      created: new Date(),
      completed: false,
      isRunning: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const checkedTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo && todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo)));
  };

  const changeTodoTimer = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo && todo.id === id && todo.timer && todo.timer.totalSeconds > 0) {
        return {
          ...todo,
          timer: { totalSeconds: todo.timer.totalSeconds - 1 },
        };
      }
      return todo;
    }));
  };

  const changeTodo = (id: number, newDescription: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo && todo.id === id
      ? { ...todo, description: newDescription }
      : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo && todo.id !== id));
  };

  const showItemsLeftTodos = () => todos.filter((todo) => todo && !todo.completed).length;

  const filterAllTodos = () => setFilter('all');
  const filterActiveTodos = () => setFilter('active');
  const filterCompletedTodos = () => setFilter('completed');
  const filterClearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo && !todo.completed));
  };

  const startTimer = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.id === id) {
        if (!todo.completed) {
          return { ...todo, isRunning: true };
        }
      }
      return todo;
    }));
  };

  const pauseTimer = (id: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id
      ? { ...todo, isRunning: false }
      : todo)));
  };

  // Запускаем таймер для каждой задачи
  useEffect(() => {
    const intervals = todos
      .filter((todo) => todo.isRunning)
      .map((todo) => setInterval(() => {
        changeTodoTimer(todo.id);
      }, 1000));

    // Очищаем все интервалы при размонтировании
    return () => intervals.forEach(clearInterval);
  }, [todos]);

  const statusList: TodoContextType = {
    onAdd: addTodo,
    todos,
    changeTodoTimer,
    onChange: changeTodo,
    onDelete: deleteTodo,
    onChecked: checkedTodo,
    filterAll: filterAllTodos,
    filterActive: filterActiveTodos,
    filterCompleted: filterCompletedTodos,
    filterClearCompleted: filterClearCompletedTodos,
    startTimer,
    pauseTimer,
    filter,
    inputValue,
    setInputValue,
    showItemsLeft: showItemsLeftTodos,
    min,
    setMin,
    sec,
    setSec,
    isRunning,
    setIsRunning,
  };

  return (
    <ContextWrapper.Provider value={statusList}>
      {children}
    </ContextWrapper.Provider>
  );
};

export default ContextProvider;
