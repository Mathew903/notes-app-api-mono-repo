import axios from 'axios';
const url = '/api/login';

export const login = async (credentials) => {
	const { data } = await axios.post(url, credentials);
	return data;
};
