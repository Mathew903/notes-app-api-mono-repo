import axios from 'axios';
const url = '/api/notes';

let token = null;
export const setToken = newToken => { token = `Bearer ${newToken}` }

export const getNotes = async () => {
	const { data } = await axios.get(url);
	return data;
};

export const createNote = async newNote => {
	const config = { headers: { Authorization: token } };
	const { data } = await axios.post(url, newNote, config);
	return data;
};

export const updateNote = async (id, newNote) => {
	const config = { headers: { Authorization: token } };
	const { data } = await axios.put(`${url}/${id}`, newNote, config);
	return data;
};

export const daleteNote = async (id, newNote) => {
	const config = { headers: { Authorization: token } };
	const { data } = await axios.delete(`${url}/${id}`, newNote, config);
	return data;
};
