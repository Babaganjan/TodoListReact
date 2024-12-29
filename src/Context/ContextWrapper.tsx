// // ContextWrapper.tsx
// import { createContext } from "react";

// export const ContextWrapper = createContext({});

import React from 'react';
import { ContextType } from './ContextProvider.tsx'; // Убедитесь, что вы импортируете ваш интерфейс

// Создание контекста с типом ContextType
export const ContextWrapper = React.createContext<ContextType | undefined>(undefined);
