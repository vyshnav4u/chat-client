import Chat from '../components/Chat/Chat';
import Home from '../components/Home/Home';
import { useChatContext } from '../context/ChatContext';

const Router = () => {
	const { showChat, theme } = useChatContext();

	return (
		<div
			style={{
				background: theme?.bgColor,
				padding: 12,
				minHeight: '100vh',
				maxHeight: '100vh',
				overflowY: 'scroll',
			}}
		>
			{showChat ? <Chat /> : <Home />}
		</div>
	);
};

export default Router;
