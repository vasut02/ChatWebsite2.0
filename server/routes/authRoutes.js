const { Router} = require('express')
const router = Router();
const authControllers = require('../controllers/authControllers')

router.post('/signup' ,authControllers.signup);
router.post('/login' ,authControllers.login);
router.get('/logout' ,authControllers.logout);
router.get('/verifyuser' ,authControllers.verifyUser);

module.exports = router;