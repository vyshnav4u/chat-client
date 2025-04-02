import { useChatContext } from '../../context/ChatContext';
import Participants from './Participents';

const ChatSideBar = () => {
	const { roomId, theme } = useChatContext();
	const onCopy = async () => {
		await navigator.clipboard.writeText(roomId);
	};

	return (
		<aside>
			<h2> Chat: Sample Chat name </h2>
			<div className="joiningDetails">
				<input type="text" value={roomId} readOnly />
				<button onClick={onCopy} style={{ background: theme?.primaryColor1 }}>
					Copy
				</button>
			</div>
			<Participants />
		</aside>
	);
};

export default ChatSideBar;
