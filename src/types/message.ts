export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  type: 'alert' | 'info' | 'recommendation';
  relatedHeartRate?: number;
}

export interface MessageUpdate {
  message: Message;
  type: 'add' | 'update' | 'delete';
}