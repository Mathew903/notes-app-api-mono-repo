const Note = require('../models/Note');
const User = require('../models/User');

const getAllNotes = async (req, res, next) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
	res.status(200).json(notes);
};

const getNote = async (req, res, next) => {
	const { id } = req.params;
	try {
		const note = await Note.findById(id).populate('user', { username: 1, name: 1 });
		res.status(200).json(note);
	} catch (error) { next(error) }
};

const createNote = async (req, res, next) => {
	const { content, important = false } = req.body;
	
	//sacar id de req gracias al middleware userExtractor -> req.userId
	const user = await User.findById(req.userId); 
	
	if (!content) return res.status(400).json({ error: 'content is missing' });
	
	const newNote = new Note({ content, important, user: user._id, date: new Date() });

	try {
		const savedNote = await newNote.save();
		user.notes.push(savedNote._id);
		await user.save();
		res.status(201).json(savedNote);
	} catch (error) { next(error) }
}; 

const updateNote = async (req, res, next) => { 
	const { id } = req.params;
	const { content, important } = req.body;
	try {
		const note = await Note.findByIdAndUpdate(id, { content, important }, { new: true });
		res.status(201).json(note);
	} catch (error) { next(error) }
};

const deleteNote = async (req, res, next) => {
	const { id } = req.params;
	try {
		await Note.findByIdAndDelete(id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};


module.exports = { getAllNotes, getNote, createNote, updateNote, deleteNote };
