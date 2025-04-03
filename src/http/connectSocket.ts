import { io } from 'socket.io-client';
import { SERVER_URI } from '../api/constants';

export const initSocketConnection = () => {
	const SERVER_PORT = SERVER_URI;
	const socket = io(SERVER_PORT);
	return socket;
};
