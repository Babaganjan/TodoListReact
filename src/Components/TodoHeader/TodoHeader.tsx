// TodoHeader.tsx
import React, { useContext } from 'react';
import ContextWrapper from '../../Context/ContextWrapper';
import './TodoHeader.css';

// Определяем типы для контекста
interface TodoContextType {
  onAdd: (inputValue: string, min: string, sec: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  min: string;
  setMin: (value: string) => void;
  sec: string;
  setSec: (value: string) => void;
}

const TodoHeader: React.FC = () => {
  const {
    onAdd, inputValue, setInputValue, min, setMin, sec, setSec,
  } = useContext(ContextWrapper) as TodoContextType;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputValue.trim() !== '') {
        onAdd(inputValue, min, sec);
        setInputValue('');
        setMin('');
        setSec('');
      }
    }
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validNumberPattern = /^\d*$/;
    if (validNumberPattern.test(value) && value.length <= 2) {
      setMin(value);
    }
  };

  const handleSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validNumberPattern = /^\d*$/;
    if (validNumberPattern.test(value) && value.length <= 2) {
      setSec(value);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={min}
          onChange={handleMinChange}
          onKeyDown={handleKeyDown}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={sec}
          onChange={handleSecChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};

export default TodoHeader;
