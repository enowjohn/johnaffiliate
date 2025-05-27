import io from 'socket.io-client';

// Default to localhost if environment variable is not set
const SOCKET_URL = window.REACT_APP_SOCKET_URL || 'http://localhost:5000';

class ChatService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
  }

  connect(userId) {
    this.socket = io(SOCKET_URL, {
      query: { userId },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('message', (message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.emit('message', message);
    }
  }

  onMessage(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }
}

export default new ChatService();
