import { io } from 'socket.io-client';

export const initSocketConnection = () => {
	const SERVER_PORT = 'http://localhost:8000';
	const socket = io(SERVER_PORT);
	return socket;
};
