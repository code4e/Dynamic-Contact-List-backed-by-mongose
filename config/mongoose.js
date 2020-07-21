const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db');

const dB = mongoose.connection;

dB.on('error', console.error.bind(console, 'Error connecting to database'));

dB.once('open', function(){
    console.log('Database is up and running');
});