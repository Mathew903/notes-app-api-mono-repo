/// <reference types="cypress" />

describe('Note App', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173');
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user = { username: 'Mathew', name: 'Matias', password: '123456' };
		cy.request('POST', 'http://localhost:3001/api/users', user);
	});

	it('frontpage can be opened', () => {
		cy.contains('Notes');
	});

	it('user can login', () => {
		cy.contains('Login').click();
		//cy.get(input).first().type('TROLL')
		cy.get('input[name="username"]').type('Mathew');
		cy.get('input[name="password"]').type('123456');
		cy.get('button[name="login-form-btn"]').click();
		cy.contains('Create a new note');
	});

	it('login fails with wrong password', () => {
		cy.contains('Login').click();
		cy.get('input[name="username"]').type('Mathew');
		cy.get('input[name="password"]').type('123456789');
		cy.get('button[name="login-form-btn"]').click();
		cy.get("[name='error']").should('contain', 'Wrong credentials');
	});

	describe('when logged in', () => {
		beforeEach(() => {
			cy.login({ username: 'Mathew', password: '123456' });
		});

		it('a new note can be created', () => {
			/* Option 1 with elements for the DOM or UI
				cy.contains('New note').click();
				cy.get("input[name='content']").type('nueva notaaaaaa');
				cy.get("input[name='important']").check();
				cy.get("button[name='form-create-note-btn']").click();
			*/

			/* Option 2 with the api */
			cy.createNote({ content: 'This is the zero note', important: false });
		});

		describe('and a note exists', () => {
			beforeEach(() => {
				cy.createNote({ content: 'This is the first note', important: false });
				cy.createNote({ content: 'This is the second note', important: false });
				cy.createNote({ content: 'This is the third note', important: false });
			});

			it('it can be made important', () => {
				/* Forma de asignar una "variable" de referencia para simplificar logica (con el metodo "as") y como utilizar esa variable con get.
					cy.contains('This is the second note').as('theNote');
					cy.get('@theNote').contains('make important').click();
					cy.get('@theNote').contains('make not important');
				*/
				cy.contains('make important').click();
				//cy.debug();
				cy.contains('make not important');
			});
		});
	});
});
