require('./config/db')
const express = require('express')
const app = express()
const port = 4000
const router = require('./router/index')
const {errorHandler} = require('./utils/errorHandler')
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swag.json');
const cors = require('cors')

const corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', router)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })