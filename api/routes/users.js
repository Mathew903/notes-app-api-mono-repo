const usersRouter = require('express').Router();
const { createUser, getUsers } = require('../controllers/users');

usersRouter.get('/', getUsers)
usersRouter.post('/', createUser);

module.exports = usersRouter;
