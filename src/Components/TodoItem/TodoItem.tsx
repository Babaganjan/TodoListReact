// TodoItem.jsx
import { useState, useEffect, useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ContextWrapper from '../../Context/ContextWrapper';
import { ContextType, Todo } from '../../Context/ContextProvider';

import './TodoItem.css';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { onChecked, onDelete, onChange } = useContext(
    ContextWrapper,
  ) as ContextType;
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(todo.description);
  // const [createdTime, setCreatedTime] = useState(todo.created);
  const [createdTime, setCreatedTime] = useState<Date>(new Date()); // или <number> с Date.now()

  const btnDeleteStyle = {
    zIndex: isEditing ? -1 : 0,
  };

  const handleTodoChecked = () => {
    onChecked(todo.id);
  };

  const handleTodoChange = () => {
    setIsEditing(true); // Переход в режим редактирования
  };

  const handleTodoDelete = () => {
    onDelete(todo.id);
  };

  const handleSave = () => {
    if (newDescription.trim()) {
      onChange(todo.id, newDescription); // Обновляем задачу с новым значением
      setCreatedTime(new Date()); // Обновляем время создания при сохранении
    }
    setIsEditing(false); // Выходим из режима редактирования
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave(); // Сохраняем при нажатии Enter
    }
  };

  // Обновление времени создания в реальном времени
  useEffect(() => {
    let interval: number; // или можно использовать number, если не используете NodeJS

    if (isEditing) {
      interval = setInterval(() => {
        setCreatedTime((prevTime) => prevTime); // Обновляем состояние каждую секунду
      }, 1000);
    }
    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [isEditing]);

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
              onBlur={handleSave} // Сохраняем при потере фокуса
              onKeyDown={handleKeyDown} // Сохраняем при нажатии Enter
              autoFocus
            />
          </>
        ) : (
          <>
            <label onClick={handleTodoChecked}>
              <span className="description">{todo.description}</span>
              <span className="created">
                created{' '}
                {/* {formatDistanceToNow(todo.created, { includeSeconds: true })} */}
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
