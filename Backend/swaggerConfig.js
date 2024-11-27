const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Swagger spec version
    info: {
      title: 'Movie Booking API', // API title
      version: '1.0.0', // API version
      description: 'API for managing movies, showtimes, theatres, and user bookings',
    },
    servers: [
      {
        url: 'http://localhost:5000', // If we spin this up elsewhere, replace this url
        description: 'Development server',
      },
    ],
  },
  components: { //-> Add an Authentication option
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: ['./Routes/*.js', './Docs/*.yaml'], // Path to the API docs (can include other folders/files as needed)
};

const specs = swaggerJsdoc(options);

module.exports = specs;