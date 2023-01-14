const {Router} = require('express');
const checkAuth = require('../middleware/checkAuth');
const {getUserInfo, updateUser} = require('../controllers/user-controller');
const userRouter = Router();
 
userRouter.get('/me',[
    checkAuth
], getUserInfo);

userRouter.put('/me',[
    checkAuth
], updateUser);

module.exports = userRouter;