import '@testing-library/jest-dom/extend-expect';
//Funcion que nos permite renderizar un componente y poder con eso testearlo
import { render, fireEvent } from '@testing-library/react';
//Me muestra detalladamente el arbol HTML o JSX del elemento que desee ver
// import { prettyDOM } from '@testing-library/react';
import Note from './Note';

test('renders content', () => {
	const note = {
		content: 'this is a test',
		important: true,
		date: new Date().toISOString(),
	};

	const mockHandler = vi.fn();

	const component = render(<Note note={note} toggleImportance={mockHandler} />);
	/* tests
		component.getByText('this is a test');
		component.getByText(`Fecha: ${note.date}`);
		expect(component.container).toHaveTextContent(note.content);
		const li = component.container.querySelector('.notes');
		console.log(prettyDOM(li));
	*/

	const button = component.getByText('make not important');
	fireEvent.click(button);

	// expect(mockHandler.mock.calls).toHaveLength(1);
	expect(mockHandler).toHaveBeenCalledTimes(1);

});
