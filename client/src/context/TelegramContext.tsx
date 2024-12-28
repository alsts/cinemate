import { createContext, useContext, ReactNode } from 'react';
import { TelegramUser } from '../hooks/useTelegramUser';
import { useTelegramUser } from '../hooks/useTelegramUser';

interface TelegramContextType {
  user: TelegramUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider = ({ 
  children,
}: { 
  children: ReactNode;
}) => {
  const { user, isLoading, isAuthenticated } = useTelegramUser();

  return (
    <TelegramContext.Provider value={{ user, isLoading, isAuthenticated }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegramContext = () => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegramContext must be used within a TelegramProvider');
  }
  return context;
};
