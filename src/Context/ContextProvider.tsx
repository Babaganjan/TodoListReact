// ContextProvider.tsx
import { useState, ReactNode } from "react";

import { ContextWrapper } from "./ContextWrapper.tsx";

// Интерфейс для задачи
export interface Todo {
  id: number;
  description: string;
  created: Date;
  completed: boolean;
}

// Интерфейс для свойств контекста
export interface ContextProviderProps {
  children: ReactNode; // Типизация children
}

// Определяем интерфейс для контекста
export interface ContextType {
  todos: Todo[];
  onAdd: (description: string) => void;
  onDelete: (id: number) => void;
  onChange: (id: number, newDescription: string) => void;
  onChecked: (id: number) => void;
  showItemsLeft: () => number;
  filterAll: () => void;
  filterActive: () => void;
  filterCompleted: () => void;
  filterClearCompleted: () => void;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (description: string) => {
    const newTodo = {
      id: todos.length + 1,
      description,
      created: new Date(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const checkedTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Функция для изменения задачи
  const changeTodo = (id: number, newDescription: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, description: newDescription } : todo
      )
    );
  };

  // Функция для удаления задачи по её ID
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const showItemsLeftTodos = (): number => {
    const itemsLeft = todos.filter((todo) => !todo.completed).length;
    return itemsLeft; // Можно вернуть значение для дальнейшего использования
  };

  const filterAllTodos = () => {
    setFilter("all"); // Устанавливаем фильтр на "все"
  };

  const filterActiveTodos = () => {
    setFilter("active"); // Устанавливаем фильтр на "активные"
  };

  const filterCompletedTodos = () => {
    setFilter("completed"); // Устанавливаем фильтр на "выполненные"
  };

  const filterClearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed)); // Удаляем выполненные задачи
  };

  const filteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos; // "all" или любое другое значение
  };

  const statusList = {
    onAdd: addTodo,
    todos: filteredTodos(),
    onDelete: deleteTodo,
    onChange: changeTodo,
    onChecked: checkedTodo,
    showItemsLeft: showItemsLeftTodos,
    filterAll: filterAllTodos,
    filterActive: filterActiveTodos,
    filterCompleted: filterCompletedTodos,
    filterClearCompleted: filterClearCompletedTodos,
  };

  return (
    <ContextWrapper.Provider value={statusList as ContextType}>
      {children}
    </ContextWrapper.Provider>
  );
};
