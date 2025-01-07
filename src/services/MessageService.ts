import { io, Socket } from 'socket.io-client';
import { Message, MessageUpdate } from '../types/message';

export class MessageService {
  private socket: Socket | null = null;
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  connect() {
    this.socket = io(this.apiUrl);
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  async fetchMessages(): Promise<Message[]> {
    const response = await fetch(`${this.apiUrl}/messages`);
    return response.json();
  }

  subscribeToUpdates(callback: (update: MessageUpdate) => void) {
    if (!this.socket) return;

    this.socket.on('messageUpdate', callback);
    return () => {
      this.socket?.off('messageUpdate', callback);
    };
  }

  async sendMessage(message: Partial<Message>): Promise<Message> {
    const response = await fetch(`${this.apiUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    return response.json();
  }
}
