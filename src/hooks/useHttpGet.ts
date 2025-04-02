import { useEffect, useState } from 'react';

type TGetProps<T> = {
	url: string;
	defaultResponse: T;
};
export const useHttpGet = <T>(props: TGetProps<T>) => {
	const { defaultResponse, url } = props;
	const [data, setData] = useState(defaultResponse);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError('');
			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error('Failed to fetch data');

				const responseData = (await response.json()) as T;
				setData(responseData);
			} catch (err) {
				if (err instanceof Error) setError(err.message);
				else setError('Something went wrong, Please contact the admin');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, isLoading, errorMessage: error, isError: !!error };
};
