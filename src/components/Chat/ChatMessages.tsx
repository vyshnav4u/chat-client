import { useCallback, useEffect, useRef } from 'react';
import { useChatContext } from '../../context/ChatContext';
import SingleMessage from './SingleMessage';
import { getMessageUri, httpGet } from '../../api/httpHelpers';
import { TChatMessageResponse } from '../../context/ChatContext.type';
import { MESSAGE_RESPONSE } from '../../context/ChatContext.constants';

const ChatMessages = () => {
	const {
		skip,
		limit,
		messages,
		user,
		lastMessageRef,
		firstMessageRef,
		scrollToMessageRef,
		scrollToMessageId,
		roomId,
		loadOldMessages,
	} = useChatContext();

	const { username } = user;
	const lastMessageIndex = messages.length - 1;
	const observer = useRef<IntersectionObserver | null>(null);

	const loadMessages = useCallback(
		async (entries: IntersectionObserverEntry[]) => {
			const entry = entries[0];
			if (!entry.isIntersecting) return;

			const newSkip = skip + limit;
			const url = getMessageUri(roomId, newSkip, limit);
			const { data } = await httpGet<TChatMessageResponse>(
				url,
				MESSAGE_RESPONSE
			);

			scrollToMessageId.current = (entry.target as HTMLDivElement).dataset
				.messageid as string;

			observer.current?.unobserve(entry.target);
			loadOldMessages(data);
		},
		[messages]
	);

	useEffect(() => {
		if (skip > 0) {
			scrollToMessageRef?.current?.scrollIntoView();
		} else {
			lastMessageRef?.current?.scrollIntoView();
		}
	}, [messages]);

	useEffect(() => {
		observer.current?.disconnect();
		observer.current = new IntersectionObserver(loadMessages, {
			threshold: 1,
		});

		if (firstMessageRef?.current) {
			observer.current?.observe(firstMessageRef?.current);
		}
	}, [messages]);

	return (
		<div
			style={{
				background: '',
				maxHeight: '90vh',
				minHeight: '90vh',
				overflowY: 'scroll',
			}}
		>
			{messages.map((message, messageIndex) => {
				const isCurrentUser = message.senderId === username;
				return (
					<SingleMessage
						key={message.messageId}
						message={message}
						showAvatar={!isCurrentUser}
						alignRight={isCurrentUser}
						isLastMessage={messageIndex === lastMessageIndex}
						isFirstMessage={messageIndex === 0}
					/>
				);
			})}
		</div>
	);
};

export default ChatMessages;
