const mongose = require('mongoose')

const urlSchema = new mongose.Schema({
    ShortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }],
},
    { timestamps: true })


const URL = mongose.model( 'Url', urlSchema );

model.exports = URL;
