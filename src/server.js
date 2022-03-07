'use strict';

const express = require('express');
const cors = require('cors');
const app = express();


const logger = require('./middleware/logger.js')
// const validator = require('./middleware/validator.js');
const notFound = require('./error-handlers/404.js');
const serverError = require('./error-handlers/500.js');
const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');
const userRoute = require('./routes/user');


app.use(express.json());
app.use(cors());
app.use(logger);


app.use(clothesRouter);
app.use(foodRouter);

app.use(userRoute);





app.get('/', (req, res) => {
  res.send('Home Route')
})



app.use(notFound);
app.use(serverError);


function start(port) {
  app.listen(port,()=> {
    console.log(`running on PORT ${port}`);
  })
}

module.exports = {
  app: app,
  start: start
}