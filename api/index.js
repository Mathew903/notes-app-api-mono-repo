require('dotenv').config();
require('./db/mongo');

const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const cors = require('cors');
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const loginRouter = require('./routes/login');

const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors.js');

const app = express();

Sentry.init({
	dsn: 'https://3b0f0bfb869447879b13b13502a71d38@o4504381274456064.ingest.sentry.io/4504381280747520',
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});

//Un middleware es una funcion que intercepta la peticion que esta pasando por nuestra api
app.use(cors());
app.use(express.json());
app.use(express.static('../app/dist'));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get('/', (req, res) => {
	res.send('<h1>Hola mundo</h1>');
});

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

app.use(notFound);
app.use(Sentry.Handlers.errorHandler());
app.use(handleErrors);

const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
	console.log(`Escuchando desde http://localhost:${PORT}`);
});

module.exports = { app, server };
