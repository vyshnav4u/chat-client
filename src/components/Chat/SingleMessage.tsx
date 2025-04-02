import { TMessage } from '../../context/ChatContext.type';
import { useChatContext } from '../../context/ChatContext';

const SingleMessage = ({
	message,
	showAvatar,
	alignRight,
	isLastMessage,
	isFirstMessage,
}: {
	message: TMessage;
	showAvatar?: boolean;
	alignRight?: boolean;
	isLastMessage: boolean;
	isFirstMessage: boolean;
}) => {
	const {
		lastMessageRef,
		firstMessageRef,
		scrollToMessageId,
		scrollToMessageRef,
	} = useChatContext();

	const getRef = () => {
		if (isFirstMessage) return firstMessageRef;

		if (isLastMessage) return lastMessageRef;

		if (scrollToMessageId.current === message.messageId)
			return scrollToMessageRef;

		return null;
	};

	return (
		<div
			ref={getRef()}
			key={message.messageId}
			className="singleMessage"
			data-messageid={message.messageId}
			style={{
				display: 'grid',
				justifyContent: alignRight ? 'right' : 'left',
				borderBottom: '1px solid rgb(229, 228, 228)',
			}}
		>
			<div style={{ display: 'grid', padding: 8 }}>
				{showAvatar && (
					<div>
						<b>{message.senderName} </b>
					</div>
				)}
				<div>{message.content}</div>
			</div>
		</div>
	);
};

export default SingleMessage;
