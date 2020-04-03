const express = require('express');
const cors    = require('cors');
const mongoose= require('mongoose');
const path    = require('path');

require('dotenv').config();

// App
const app = express();

// Middleware
app.use(cors());

// Body Parser, MW
app.use(express.json());
// app.use(express.urlencoded({extended: false}));


// mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB esatablished!'));
connection.on('error', err => console.log(`Error: ${err}`))


// Routers
app.use('/api/newtask', require('./routes/api/newtask'));


if( process.env.NODE_ENV === 'production')
{
    app.use(express.static('./client/build'))

    // accessing direct url like exampel.com/user
    app.use('/*', (req, res) => { 
        return res.sendFile(path.join(__dirname, './client/build/index.html')); 
    });
}

// PORT
const PORT = process.env.PORT | 5001;

// Listening
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));