import { useState } from 'react';
import { login } from '../data/login';
import { setToken } from '../data/notes';
import Togglabe from './Togglabe';
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
	const [userLogin, setUserLogin] = useState({ username: '', password: '' });
	const [error, setError] = useState(null);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await login(userLogin);
			window.localStorage.setItem('loggedAppNoteUser', JSON.stringify(user));
			setToken(user.token);
			loginUser(user);
			setUserLogin({ username: '', password: '' });
		} catch (error) {
			setError('Wrong credentials')
			setTimeout(() => { setError(null) }, 5000);
		}
	};

	const handleLoginChange = (e) => { setUserLogin({ ...userLogin, [e.target.name]: e.target.value }) };

	return (
		<Togglabe buttonLabel="Login">
				{error && <h2 name="error">{error}</h2>}
				<form onSubmit={handleLoginSubmit}>
					<input
						type="text"
						placeholder="username"
						value={userLogin.username}
						name="username"
						onChange={handleLoginChange}
					/>
					<input
						type="password"
						placeholder="password"
						value={userLogin.password}
						name="password"
						onChange={handleLoginChange}
					/>
					<button type="submit" name='login-form-btn'>Login</button>
				</form>
		</Togglabe>
	);
};

LoginForm.prototype = {
	loginUser: PropTypes.func.isRequired
}

export default LoginForm;
