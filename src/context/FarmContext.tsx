import React, { createContext, useContext, ReactNode } from 'react';
import Farm from '../types';

// Define the shape of your context data
interface FarmContextData {
  farms: Farm[];
}

// Create the context
const FarmContext = createContext<FarmContextData | undefined>(undefined);

// Create a provider component to wrap your application
interface FarmProviderProps {
  children: ReactNode;
  initialFarms: Farm[]; // Initial data to provide
}

export const FarmProvider: React.FC<FarmProviderProps> = ({ children, initialFarms }) => {
  return <FarmContext.Provider value={{ farms: initialFarms }}>{children}</FarmContext.Provider>;
};

// Create a custom hook to access the context
export const useFarmContext = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarmContext must be used within a FarmProvider');
  }
  return context;
};
