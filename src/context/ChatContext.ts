import { createContext, useContext } from 'react';
import { TChatConfig } from './ChatContext.type';
import { initialState } from './ChatContext.constants';

export const ChatContext = createContext<TChatConfig>(initialState);

export const useChatContext = () => {
	return useContext(ChatContext);
};
