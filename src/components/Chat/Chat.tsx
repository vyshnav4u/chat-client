import { useEffect } from 'react';
import { TMessage, TSocket } from '../../context/ChatContext.type';
import ChatMessages from './ChatMessages';
import { useChatContext } from '../../context/ChatContext';
import AddNewMessage from './AddNewMessage';
import ChatSideBar from './ChatSideBar';

const Chat = () => {
	const context = useChatContext();
	const { setMessageLocally } = context;
	const socket = context.socket as TSocket;

	useEffect(() => {
		socket.on('receive_message', (data: TMessage) => {
			setMessageLocally(data);
		});
	}, []);

	return (
		<div
			className="chatContainer"
			style={{
				display: 'grid',
				gridTemplateColumns: '3fr 2fr',
			}}
		>
			<main style={{ maxHeight: '100%' }}>
				<ChatMessages />
				<AddNewMessage />
			</main>
			<ChatSideBar />
		</div>
	);
};

export default Chat;
