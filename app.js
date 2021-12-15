const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSON = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

// accept request in form or JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./app/models');
db.client.sync();

require('./app/routes/player.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
