require("dotenv").config();

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'SafeLabs Playlist API',
    description: 'A new way to create playlists'
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http', 'https']
};

const outputFile = 'src/doc/swagger-output.json';
const endpointsFiles = ['src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../index.js');
});
