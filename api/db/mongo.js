const mongoose = require('mongoose');

const { connect, set } = mongoose;
const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;
const connectStr = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI;

set('strictQuery', true);
connect(connectStr)
	.then(() => console.log('Database Connection'))
	.catch((err) => console.log(err));
