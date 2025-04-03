import { createRef } from 'react';
import { TChatConfig } from './ChatContext.type';

export const MESSAGE_PER_PAGE = 15;

export const MESSAGE_RESPONSE = {
	messages: [],
	limit: MESSAGE_PER_PAGE,
	skip: 0,
	total: 0,
};

export const initialState: TChatConfig = {
	messages: [],
	skip: 0,
	total: 0,
	limit: MESSAGE_PER_PAGE,
	user: { username: 'alexAnder', displayName: 'Master Alex' },
	showChat: false,
	socket: undefined,
	roomId: '',
	setDisplayName: () => {},
	setMessage: () => {},
	setMessageLocally: () => {},
	loadOldMessages: () => {},
	lastMessageRef: createRef<HTMLDivElement>(),
	firstMessageRef: createRef<HTMLDivElement>(),
	scrollToMessageRef: createRef<HTMLDivElement>(),
	scrollToMessageId: { current: '' },
};
