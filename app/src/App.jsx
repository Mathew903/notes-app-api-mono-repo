import { useState, useEffect } from 'react';
import { getNotes, updateNote } from './data/notes';
import { createNote } from './data/notes';
import CreateNoteForm from './components/CreateNoteForm';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import { setToken } from './data/notes';

function App() {
	const [notes, setNotes] = useState([]);
	const [user, setUser] = useState(null);

	const addNote = (newNote) => { createNote(newNote).then((note) => setNotes([...notes, note])) };
	const loginUser = (credentials) => { setUser(credentials) };
	
	const handleLogout = () => {
		setUser(null);
		setToken(user.token);
		window.localStorage.removeItem('loggedAppNoteUser');
	};

	const toggleImportance = async (id) => {
		const note = notes.find(note => note.id === id)
		const changeNote = {...note, important: !note.important}
		const returnedNote = await updateNote(note.id, changeNote);
		setNotes(notes.map(note => note.id !== id ? note : returnedNote))
	};

	useEffect(() => { getNotes().then((res) => setNotes(res)) }, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedAppNoteUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			setToken(user.token);
		}
	}, []);

	return (
		<>
			{user
				? <CreateNoteForm addNote={addNote} handleLogout={handleLogout} />
				: <LoginForm loginUser={loginUser} />
			}
			<div className="container">
				<h1>Notes</h1>
				{notes && notes?.map(note => <Note note={note} key={note.id} toggleImportance={toggleImportance} /> )}
			</div>
		</>
	);
}

export default App;
