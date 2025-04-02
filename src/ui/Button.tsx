import React from 'react';
import { useChatContext } from '../context/ChatContext';

type TButtonProps = {
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent) => void;
};

const Button = (props: TButtonProps) => {
	const { children, onClick } = props;
	const { theme } = useChatContext();

	const onBtnClick = (e: React.MouseEvent) => {
		onClick?.(e);
	};

	return (
		<button
			style={{ background: theme?.primaryColor1, color: '#fff' }}
			onClick={onBtnClick}
		>
			{children}
		</button>
	);
};

export default Button;
