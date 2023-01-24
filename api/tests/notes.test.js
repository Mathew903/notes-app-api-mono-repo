const mongoose = require('mongoose');
const { server } = require('../index');
const Note = require('../models/Note');
const { initialNotes, api, getAllContentsFromNotes } = require('./helpers');

beforeEach(async () => {
	await Note.deleteMany({});

	/* Paralelo 
		const notesObjects = initialNotes.map(note => new Note(note))
		const promises = notesObjects.map(note => note.save())
		await Promise.all(promises)	
	*/

	/* Secuencial */
	for (const note of initialNotes) {
		const noteObject = new Note(note);
		await noteObject.save();
	}
});

describe('GET all notes', () => {
	test('notes are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('notes are notes', async () => {
		const { body } = await getAllContentsFromNotes();
		expect(body).toHaveLength(initialNotes.length);
	});

	test('the first note say "Hola"', async () => {
		const { contents } = await getAllContentsFromNotes();
		expect(contents).toContain('Hola');
	});
});

describe('POST note', () => {
	test('A valid note can be added', async () => {
		const newNote = { content: 'NASHE', important: false };
		await api
			.post('/api/notes')
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const { contents, body } = await getAllContentsFromNotes();
		expect(body).toHaveLength(initialNotes.length + 1);
		expect(contents).toContain(newNote.content);
	});

	test('note without content is not added', async () => {
		const newNote = { important: false };

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const { body } = await getAllContentsFromNotes();
		expect(body).toHaveLength(initialNotes.length);
	});
});

describe('DELETE note', () => {
	test('a note can be deleted', async () => {
		const { body: firstNote } = await getAllContentsFromNotes();
		await api.delete(`/api/notes/${firstNote[0].id}`).expect(204);

		const { contents, body: secondNote } = await getAllContentsFromNotes();
		expect(secondNote).toHaveLength(initialNotes.length - 1);
		expect(contents).not.toContain(firstNote[0].content);
	});

	test('a note that do not exist can not be deleted', async () => {
		await api.delete('/api/notes/132312').expect(400);

		const { body } = await getAllContentsFromNotes();

		expect(body).toHaveLength(initialNotes.length);
	});
});

describe('PUT note', () => {
	test('updating first note correctly', async () => {
		const { body: beforeNote } = await getAllContentsFromNotes();
		const updateNote = { content: 'jijiji', important: true };

		await api
			.put(`/api/notes/${beforeNote[0].id}`)
			.send(updateNote)
			.expect(201);
		
		const { body: afterNote } = await getAllContentsFromNotes();
		expect(afterNote[0]).not.toEqual(beforeNote[0])
	});
});

afterAll(() => {
	mongoose.connection.close();
	server.close();
});
