// TodoHeader.tsx
import { useState,useContext, KeyboardEvent } from "react";
import { ContextWrapper } from "../../Context/ContextWrapper.tsx";
import "./TodoHeader.css";

export const TodoHeader: React.FC = () => {
  const { onAdd } = useContext(ContextWrapper) as { onAdd: (description: string) => void };
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        onAdd(inputValue);
        setInputValue("");
      }
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </header>
  );
};
