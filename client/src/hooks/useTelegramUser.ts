import { useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import WebApp from '@twa-dev/sdk';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
  allows_write_to_pm?: boolean;
}

export const useTelegramUser = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        // First get the unsafe user data for UI display
        const telegramUser = WebApp.initDataUnsafe.user;
        if (!telegramUser) {
          throw new Error('No Telegram user data available');
        }

        // Set initial user data for UI
        setUser({
          id: telegramUser.id,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          username: telegramUser.username,
          language_code: telegramUser.language_code,
          is_premium: telegramUser.is_premium,
          photo_url: telegramUser.photo_url,
          allows_write_to_pm: telegramUser.allows_write_to_pm,
        });

        // Validate user with backend
        await authApi.validateUser();
      } catch (error) {
        console.error('Error validating Telegram user:', error);
        setError(error instanceof Error ? error.message : 'Authentication failed');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateUser();
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
};
