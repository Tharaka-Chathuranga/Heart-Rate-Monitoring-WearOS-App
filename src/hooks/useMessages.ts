import { useState, useEffect } from 'react';
import { Message } from '../types/message';
import { MessageService } from '../services/MessageService';

export const useMessages = (apiUrl: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messageService = new MessageService(apiUrl);
    let cleanup: (() => void) | undefined;

    const initialize = async () => {
      try {
        // Connect to WebSocket
        messageService.connect();

        // Fetch initial messages
        const initialMessages = await messageService.fetchMessages();
        setMessages(initialMessages);

        // Subscribe to real-time updates
        cleanup = messageService.subscribeToUpdates((update) => {
          setMessages(currentMessages => {
            switch (update.type) {
              case 'add':
                return [...currentMessages, update.message];
              case 'update':
                return currentMessages.map(msg =>
                  msg.id === update.message.id ? update.message : msg
                );
              case 'delete':
                return currentMessages.filter(msg => msg.id !== update.message.id);
              default:
                return currentMessages;
            }
          });
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize messages');
        setLoading(false);
      }
    };

    initialize();

    return () => {
      cleanup?.();
      messageService.disconnect();
    };
  }, [apiUrl]);

  const sendMessage = async (messageData: Partial<Message>) => {
    try {
      const messageService = new MessageService(apiUrl);
      const newMessage = await messageService.sendMessage(messageData);
      return newMessage;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      throw err;
    }
  };

  return { messages, loading, error, sendMessage };
};
