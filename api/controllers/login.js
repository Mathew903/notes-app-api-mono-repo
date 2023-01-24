const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/User')

const loginPost = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({ username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) res.status(401).json({ error: 'invalidad user or password' })
     
    const userForToken = { id: user._id, username: user.username }
    const token = jwt.sign(userForToken, process.env.SECRET_TOKEN, {expiresIn: 60 * 60 * 24 * 7});

    res.send({ name: user.name, username: user.username, token })
}


module.exports = { loginPost }
