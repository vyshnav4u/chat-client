import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TMessage } from '../../context/ChatContext.type';
import { useChatContext } from '../../context/ChatContext';

const AddNewMessage = () => {
	const [currentMessage, setCurrentMessage] = useState('');
	const {
		setMessage,
		roomId,
		user: { displayName, username },
		theme,
	} = useChatContext();

	const sentMessage = async () => {
		if (!currentMessage) return;

		const messageData: TMessage = {
			messageId: uuid(),
			roomId,
			senderId: username,
			senderName: displayName,
			content: currentMessage,
			time: String(new Date()),
		};

		setCurrentMessage('');
		setMessage(messageData);
	};

	const onEnter = (e: React.KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		if (e.shiftKey) return;

		sentMessage();
	};

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '4fr 80px',
				gap: 8,
			}}
		>
			<textarea
				placeholder="message"
				value={currentMessage}
				onChange={(e) => setCurrentMessage(e.target.value)}
				onKeyUp={onEnter}
				style={{ width: '100%' }}
			/>
			<button
				style={{ background: theme?.primaryColor1, borderRadius: 20 }}
				onClick={sentMessage}
			>
				▶
			</button>
		</div>
	);
};

export default AddNewMessage;
