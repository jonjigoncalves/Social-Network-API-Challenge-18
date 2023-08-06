const express =  require('express');

const routes = require('./routes');



// load db connection
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3333;


//  middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use routes that were called in at the top of the page
app.use(routes); 

// start server after db connection
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  
