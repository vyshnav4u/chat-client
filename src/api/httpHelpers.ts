import { MESSAGE_PER_PAGE } from '../context/ChatContext.constants';
import { MESSAGE_URI } from './constants';

export const getMessageUri = (
	chatId: string,
	skip = 0,
	limit = MESSAGE_PER_PAGE
) => {
	return `${MESSAGE_URI}/${chatId}?limit=${limit}&skip=${skip}`;
};

export const httpGet = async <T>(url: string, defaultData: T) => {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Error occurred while fetching data.');

		const data = (await response.json()) as T;
		return { data, error: '' };
	} catch (err) {
		const message =
			err instanceof Error ? err.message : 'An unknown error occurred.';
		return { error: message, data: defaultData };
	}
};
