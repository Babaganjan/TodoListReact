// TodoItem.tsx
import React, { useState, useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ContextWrapper from '../../Context/ContextWrapper';
import './TodoItem.css';

interface Todo {
  id: number;
  description: string;
  timer: {
    totalSeconds: number;
  };
  created: Date;
  completed: boolean;
  isRunning: boolean;
}

// Определяем типы для контекста
interface TodoContextType {
  onChecked: (id: number) => void;
  onDelete: (id: number) => void;
  onChange: (id: number, newDescription: string) => void;
  startTimer: (id: number) => void;
  pauseTimer: (id: number) => void;
}

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const {
    onChecked, onDelete, onChange, startTimer, pauseTimer,
  } = useContext(ContextWrapper) as TodoContextType;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>(todo.description);
  const [createdTime, setCreatedTime] = useState<number>(todo.created.getTime());

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleTodoChecked = () => {
    onChecked(todo.id);
    pauseTimer(todo.id);
  };

  const handleTodoChange = () => {
    setIsEditing(true);
  };

  const handleTodoDelete = () => {
    onDelete(todo.id);
  };

  const handleSave = () => {
    if (newDescription.trim()) {
      onChange(todo.id, newDescription);
      setCreatedTime(Date.now());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const btnDeleteStyle: React.CSSProperties = {
    zIndex: isEditing ? -1 : 0,
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleTodoChecked}
        />
        {isEditing ? (
          <>
            <input
              className="edit-input"
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <>
            <label>
              <span className="title" onClick={handleTodoChecked}>
                {todo.description}
              </span>
              <span className="description">
                <button
                  className="icon icon-play"
                  onClick={() => startTimer(todo.id)}
                  disabled={todo.isRunning}
                ></button>
                <button
                  className="icon icon-pause"
                  onClick={() => pauseTimer(todo.id)}
                  disabled={!todo.isRunning}
                ></button>
                <span>{formatTime(todo.timer.totalSeconds)}</span>
              </span>
              <span className="created">
                created{' '}
                {formatDistanceToNow(new Date(createdTime), {
                  includeSeconds: true,
                  addSuffix: true,
                })}
              </span>
            </label>
            <button
              className="icon icon-edit"
              onClick={handleTodoChange}
            ></button>
          </>
        )}
        <button
          className="icon icon-destroy"
          onClick={handleTodoDelete}
          style={btnDeleteStyle}
        ></button>
      </div>
    </li>
  );
};

export default TodoItem;
