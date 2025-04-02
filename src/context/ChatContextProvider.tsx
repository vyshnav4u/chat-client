import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
	TChatConfig,
	TChatMessageResponse,
	TMessage,
} from './ChatContext.type';
import { generateUsername } from '../utils/commonUtil';
import { getColorPallet } from '../utils/themeConfig';
import { initSocketConnection } from '../http/connectSocket';
import { ChatContext, initialState } from './ChatContext';
import { getMessageUri, httpGet } from '../api/httpHelpers';
import { MESSAGE_RESPONSE } from './constants';

type TChatContextProvider = {
	children: JSX.Element;
};

export const ChatContextProvider = ({ children }: TChatContextProvider) => {
	const [state, setChatState] = useState<TChatConfig>(initialState);

	const lastMessageRef = useRef<HTMLDivElement>(null);
	const firstMessageRef = useRef<HTMLDivElement>(null);
	const scrollToMessageRef = useRef<HTMLDivElement | null>(null);
	const scrollToMessageId = useRef('');

	useEffect(() => {
		const getCurrentChat = async () => {
			if (!state.showChat) return;
			const { data } = await httpGet<TChatMessageResponse>(
				getMessageUri(state.roomId),
				MESSAGE_RESPONSE
			);
			await setChatState((prevState) => ({ ...prevState, ...data }));
		};

		getCurrentChat();
	}, [state.showChat]);

	const setDisplayName = (name: string, room?: string) => {
		const username = generateUsername(name);
		const socket = initSocketConnection();
		const roomId = room ?? uuid();
		setChatState((prevState) => ({
			...prevState,
			user: { displayName: name, username },
			showChat: true,
			socket,
			roomId,
		}));
		socket.emit('join_room', { roomId });
	};

	const setMessage = async (message: TMessage) => {
		const { socket } = state;
		await socket?.emit('sent_message', message);

		await setChatState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, message],
		}));
		lastMessageRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
		});
	};

	// when message received from server we are using this to update our local message
	const setMessageLocally = (message: TMessage) => {
		setChatState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, message],
		}));
	};

	const loadOldMessages = (data: TChatMessageResponse) => {
		const { messages, ...meta } = data;
		if (!messages.length) return;

		setChatState((prevState) => ({
			...prevState,
			...meta,
			messages: [...messages, ...prevState.messages],
		}));
	};

	const theme = getColorPallet();

	const contextValue: TChatConfig = {
		...state,
		setDisplayName,
		theme,
		setMessage,
		setMessageLocally,
		lastMessageRef,
		firstMessageRef,
		scrollToMessageRef,
		loadOldMessages,
		scrollToMessageId,
	};
	return (
		<ChatContext.Provider value={contextValue}>
			<div style={{ background: theme.bgColor }} className="chat-wrapper">
				{children}
			</div>
		</ChatContext.Provider>
	);
};
