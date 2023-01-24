const notesRouter = require('express').Router();
const { getAllNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/notes');

//middleware para obtener el id mediante el token de autenticacion
const userExtractor = require('../middleware/userExtractor'); 

notesRouter.route('/').get(getAllNotes).post(userExtractor, createNote);
notesRouter.route("/:id").get(getNote).delete(userExtractor, deleteNote).put(userExtractor, updateNote);

module.exports = notesRouter;
