const { app } = require('../index');
const supertest = require('supertest');
const User = require('../models/User');

const api = supertest(app);

const initialNotes = [
	{
		content: 'Hola',
		important: false,
		date: new Date(),
	},
	{
		content: 'ajajja',
		important: true,
		date: new Date(),
	},
];

const getAllContentsFromNotes = async () => {
	const response = await api.get('/api/notes');

	return {
		contents: response.body.map((note) => note.content),
		body: response.body,
	};
};

const getUsers = async () => {
	const usersDB = await User.find({});
	return usersDB.map((user) => user.toJSON());
};

module.exports = {
	initialNotes,
	api,
	getAllContentsFromNotes,
	getUsers,
};
