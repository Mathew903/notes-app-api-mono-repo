import { useState, useRef } from 'react';
import Togglabe from './Togglabe';
import PropTypes from 'prop-types'

const INITIAL_VALUES = { content: '', important: false };

const CreateNoteForm = ({ addNote, handleLogout }) => {
	const [newNote, setNewNote] = useState(INITIAL_VALUES);
	const toggableRef = useRef();

	const handleInputForm = (name, value) => { setNewNote({ ...newNote, [name]: value }) };

	const createNote = async (e) => {
		e.preventDefault();
		try {
			if (!newNote.content) alert('Completa el content para enviar la informacion');
			addNote(newNote);
			setNewNote(INITIAL_VALUES);
			toggableRef.current.toggleVisibility()
		} catch (e) { console.log(e) }
	};

	return (
		<>
			<Togglabe buttonLabel="New note" ref={toggableRef}>
				<h3>Create a new note</h3>
				<form onSubmit={createNote}>
					<input
						type="text"
						name="content"
						placeholder="Content"
						value={newNote.content}
						onChange={(e) => handleInputForm(e.target.name, e.target.value)}
					/>
					<div>
						<label htmlFor="important">Important</label>
						<input
							type="checkbox"
							name="important"
							onChange={(e) => handleInputForm(e.target.name, e.target.checked)}
							checked={newNote.important}
						/>
					</div>
					<button type="submit" id="important" name='form-create-note-btn'>
						Create
					</button>
				</form>
			</Togglabe>
			<button onClick={handleLogout}>Cerrar sesion</button>
		</>
	);
};

CreateNoteForm.prototype = {
	addNote: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired
}

export default CreateNoteForm;
