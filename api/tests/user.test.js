const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { api, getUsers } = require('./helpers');
const { server } = require('../index');

describe('creating new user', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const passwordHash = await bcrypt.hash('contratroll', 10);
		const newUser = new User({
			username: 'TROLL',
			name: 'juanito',
			passwordHash,
		});
		await newUser.save();
	});

	test('works as expected creating a fresh username', async () => {
		const usersAtStart = await getUsers();

		const newUser = {
			username: 'Julio2312',
			name: 'Julio',
			password: 'julio123',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await getUsers();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test('creating fails with proper statuscode and message if username is already taken', async () => {
		const usersAtStart = await getUsers();
		const newUser = {
			username: 'TROLL',
			name: 'pabloescobar',
			password: 'jijiji',
		};

		const { body } = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(body.error).toContain('`username` to be unique');

		const usersAtEnd = await getUsers();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
	server.close();
});
