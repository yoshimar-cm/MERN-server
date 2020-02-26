///rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


//CREAR UN USUARIO
//api/auth
router.post('/',
    [
        check('email','Agrega un email valido').isEmail(),
        check('password','el password debe ser de minimo 6 caracteres').isLength({min: 6})
    ],
    authController.authUser
);

//Obtiene el usuario autenticado
router.get('/',
     auth,
      authController.usuarioAutenticado
);

module.exports = router;