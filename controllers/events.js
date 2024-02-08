const {response} = require('express'); 
const Evento = require('../models/Evento');

const {z} = require('zod');

const EventoSchema = z.object({
    date: z.any(),
    ventas: z.number(),
    compras: z.number(),
    efectivo:  z.number(),
});


const getEventos = async(req, res = response) => {

    try {
        const eventos = await Evento.find().populate('user', 'name');
        
        res.status(201).json({
            ok: true, 
            eventos
        })

    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador'
        })
    }
}

const crearEventos = async(req, res = response) => {
    // const evento = new Evento(req.body); 
    try {
        const evento = EventoSchema.parse(req.body)
        const eventoDB = new Evento(req.body)
        eventoDB.user = req.uid
        const eventoGuardado = await eventoDB.save();

        res.status(201).json({
            ok: true, 
            eventoGuardado,
        })
        
    } catch(error) {
        console.log(error);
        res.status(400).json({
            ok: false, 
            error: error.errors,
            msg: 'Hable con el administrador'
        })
    }


}; 

const eliminarEventos = async(req, res = response) => {
    
    const eventoId = req.params.id; 
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
         if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese id'
            })
         };
         if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false, 
                msg: 'No tiene el privilegio de eliminar este evento'
            })
         };

         await Evento.findByIdAndDelete(eventoId)

         res.status(201).json({
            ok: true, 
        })
  
    } catch (error) {
        console.log(error); 
        return res.status(501).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}


module.exports = {
    getEventos,
    crearEventos,
    eliminarEventos 
    
}