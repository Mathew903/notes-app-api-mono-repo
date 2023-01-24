const Note = ({ note, toggleImportance }) => {
	return (
		<div className="container-notes">
			<div className="notes">
				<h2>{note.content}</h2>
				<h4>Fecha: {note.date}</h4>
				<h3>Important: {note.important.toString()}</h3>
				<button onClick={() => toggleImportance(note.id)}>
					{note.important ? 'make not important' : 'make important'}
				</button>
			</div>
		</div>
	);
};

export default Note;
