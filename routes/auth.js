const {Router} = require('express');
const {register, login, logout, isLoggedIn} = require('../controllers/auth-controller');
const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/is_logged_in', isLoggedIn);

module.exports = authRouter;