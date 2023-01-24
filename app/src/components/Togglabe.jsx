import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglabe = forwardRef(({ children, buttonLabel = 'Show' }, ref) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => setVisible(!visible);

	useImperativeHandle(ref, () => ({ toggleVisibility }));

	return (
		<>
			<div style={{ display: visible ? 'none' : '' }}>
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div style={{ display: visible ? '' : 'none' }}>
				{children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</>
	);
});

Togglabe.displayName = 'Togglabe';
Togglabe.propTypes = { buttonLabel: PropTypes.string };

export default Togglabe;
