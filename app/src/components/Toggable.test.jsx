import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglabe from './Togglabe';

describe('<Togglabe />', () => {
	let component;
    const buttonLabel = 'Show'
	beforeEach(() => {
		component = render(
			<Togglabe buttonLabel={buttonLabel}>
				<div>test</div>
			</Togglabe>
		);
	});

	test('render its children', () => {
		component.getByText('test');
	});
	
    test('render its children', () => {
		const el = component.getByText('test');
		expect(el.parentNode).toHaveStyle('display: none');
    });
    
    test('after clicking its children must be show', () => {
        const el = component.getByText('test');
        expect(el.parentNode).toHaveStyle('display: none');
        
        const button = component.getByText(buttonLabel);
        fireEvent.click(button);
        
        expect(el.parentNode).not.toHaveStyle('display: none');
    })
});
