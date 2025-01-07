export class MessageModel {
  static create(data: Partial<Message>): Message {
    return {
      id: data.id || Date.now().toString(),
      text: data.text || '',
      sender: data.sender || '',
      timestamp: data.timestamp || Date.now(),
      type: data.type || 'info',
      relatedHeartRate: data.relatedHeartRate
    };
  }
}