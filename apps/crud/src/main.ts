/**
 * This is not a production server yet!
 */


 import * as express from 'express';

 const app = express();
 const cors = require('cors');
 
 app.get('/api', (req, res) => {
   res.send({ message: 'Welcome to crud!' });
 });
 
 const port = process.env.port || 3333;
 const server = app.listen(port, () => {
   console.log(`Listening at http://localhost:${port}/api`);
 });
 
 const errorHandler = require('./_middleware/error-handler');
 
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());
 
 // api routes
 app.use('/users', require('./users/users.controller'));
 
 // global error handler
 app.use(errorHandler);
 
 server.on('error', console.error);
