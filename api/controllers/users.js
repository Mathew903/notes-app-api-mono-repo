const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = async (req, res) => {
	const { username, name, password } = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({ username, name, passwordHash });

	try {
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (error) { res.status(400).json({ error: error.errors.username.message }) }
};

const getUsers = async (req, res) => {
	const users = await User.find({}).populate('notes', { content: 1, date: 1 })
	res.status(200).json(users)
};

module.exports = {
	createUser,
	getUsers,
};
