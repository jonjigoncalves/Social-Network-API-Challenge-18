const express =  require('express');


// load db connection
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// import user and thought routes
const userRoutes = require('./routes/user_routes');
const thoughtRoutes = require('./routes/thought_routes');


//  middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use the const of routes we set at the top of the page and prefix api as the starting route
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

// start server after db connection
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  
