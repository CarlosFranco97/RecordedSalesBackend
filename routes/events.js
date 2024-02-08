
/* 
    Ruta de eventos /Events
    host + /api/events 
     
    */

const {Router} = require('express'); 
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { getEventos, crearEventos, eliminarEventos } = require('../controllers/events');


router.use(validarJWT)

router.get('/', getEventos); 

router.post('/', crearEventos); 

router.delete('/:id', eliminarEventos);

module.exports = router

// [
//     check('date', 'La fecha es requerida').not().isEmpty(),
//     check('ventas', 'El campo de ventas es obligatorio').not().isEmpty(),
//     check('compras', 'El campo de compras es obligatorio').not().isEmpty(),
//     check('efectivo', 'El campo de efectivo es obligatorio').not().isEmpty(),
//     validarCampos
//     ],   