import { createContext, useContext } from 'react';
import { TChatConfig } from './ChatContext.type';
import { MESSAGE_PER_PAGE } from './constants';

export const initialState: TChatConfig = {
	messages: [],
	skip: 0,
	total: 0,
	limit: MESSAGE_PER_PAGE,
	user: { username: 'alexAnder', displayName: 'Master Alex' },
	showChat: false,
	socket: null,
	roomId: '',
	setDisplayName: () => {},
	setMessage: () => {},
	setMessageLocally: () => {},
	loadOldMessages: () => {},
	lastMessageRef: null,
	firstMessageRef: null,
	scrollToMessageRef: null,
	scrollToMessageId: { current: '' },
};

export const ChatContext = createContext<TChatConfig>(initialState);

export const useChatContext = () => {
	return useContext(ChatContext);
};
