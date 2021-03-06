const express = require('express');
const mongoose= require('mongoose');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

// App
const app = express();


// Middle for URL parser
app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB established!'))
connection.on('error', err => console.log(`Error: ${err}`))

// Routers
app.use('/api/newtask', require('./routes/api/newtask'));

if ( process.env.NODE_ENV === 'production' )
{
    app.use(express.static('./client/build'));

    //access direct url like /abc
    app.use('/*', (req, res) => {
        return res.sendFile(path.join(__dirname, './client/build/index.html'));
    })
}
// PORT
const PORT = process.env.PORT || 5001;

// Listening
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
