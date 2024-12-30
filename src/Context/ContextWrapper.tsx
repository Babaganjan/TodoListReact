// // ContextWrapper.tsx
import React from 'react';
import { ContextType } from './ContextProvider'; // Убедитесь, что вы импортируете ваш интерфейс

// Создание контекста с типом ContextType
const ContextWrapper = React.createContext<ContextType | undefined>(undefined);

export default ContextWrapper;
