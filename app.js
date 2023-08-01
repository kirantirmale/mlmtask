require('./config/db')
const express = require('express')
const app = express()
const port = 3000
const router = require('./router/index')
const {errorHandler} = require('./utils/errorHandler')
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swag.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', router)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })