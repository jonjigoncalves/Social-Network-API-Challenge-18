const mongoose = require('mongoose');


const isProdcution = process.env.PORT;

if(isProdcution){
    mongoose.connect('mongodb+srv://jg:UKVMHV0DJKOUKimH@cluster0.lpt1bmq.mongodb.net/?retryWrites=true&w=majority')
}
// Connect to the MongoDB database located at 'mongodb://127.0.0.1:27017/planets_api_db'
mongoose.connect('mongodb://127.0.0.1:27017/planets_api_db');

// Export the database connection object to be used in other parts of the application
module.exports = mongoose.connection;
