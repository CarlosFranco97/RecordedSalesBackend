/* Rutas de usuarios /Auth 
  host + /api/auth */


const {Router} = require('express');

const { loginUsuario, revalidarToken, crearUsuario } = require('../controllers/auth');
const router = Router(); 
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/register', 
    [check('name', 'El nombre es obligatorio').not().isEmpty(), 
    check('password', 'El password mminímo de 6 letras').isLength({min: 6}), 
    validarCampos], crearUsuario)

router.post('/', [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').isLength({min: 6}),
        validarCampos], loginUsuario); 

router.get('/renew', validarJWT, revalidarToken)

module.exports = router