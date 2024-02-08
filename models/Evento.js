const {Schema, model} = require('mongoose');


const EventoSchema = Schema({
    date: {
        type: Date, 
        required: true,
    },
    ventas: {
        type: Number, 
        required: true
    },
    compras: {
        type: Number,
        required: true
    },
    efectivo: {
        type: Number,
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

EventoSchema.method('toJSON', function(){
    const {_v, _id, ...object} = this.toObject();
    object.id = _id;
    return object
})

module.exports = model('Evento', EventoSchema);