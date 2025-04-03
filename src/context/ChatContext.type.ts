import { Socket } from 'socket.io-client';

export type TUser = {
	username: string;
	displayName: string;
};

export type TMessage = {
	messageId: string;
	roomId: string;
	time: string;
	senderId: string;
	senderName: string;
	content: string;
};

export type TSocket = Socket;

export type TChatConfig = {
	user: TUser;

	messages: TMessage[];
	skip: number;
	total: number;
	limit: number;

	setDisplayName: (name: string, room?: string) => void;
	setMessage: (message: TMessage) => void;
	setMessageLocally: (message: TMessage) => void;
	loadOldMessages: (messagesData: TChatMessageResponse) => void;

	theme?: {
		primaryColor1: string;
		primaryColor2: string;
		bgColor: string;
	};

	showChat: boolean;
	socket: undefined | Socket;
	roomId: string;
	lastMessageRef: React.RefObject<HTMLDivElement>;
	firstMessageRef: React.RefObject<HTMLDivElement>;
	scrollToMessageRef: React.RefObject<HTMLDivElement>;
	scrollToMessageId: React.MutableRefObject<string>;
};

export type TChatMessageResponse = {
	messages: TMessage[];
	limit: number;
	skip: number;
	total: number;
};
