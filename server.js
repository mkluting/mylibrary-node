const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Initialize Express
const app = express();

// Use bodyparsers for json and url encoding and CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// error checking
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

// Get configured routes
require('./routes')(app);

// Set up API DOCS with swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// listen on configured port
app.listen(config.PORT, () => {
    console.log('server started');
});
