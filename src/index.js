require('express-async-errors');

const swaggerUi = require('swagger-ui-express');
const app = require('express')();
const cors = require('cors')

const ApiError = require('./errors/ApiError')
const ValidatorError = require('./errors/ValidatorError')

app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./doc/swagger-output.json')));

app.use("/", require('./api/playlist'));

app.use((err, _req, res, _next) => {
  if (err instanceof ApiError || err instanceof ValidatorError) {
    return res.status(400).json({ error: err.message })
  }

  return res.status(500).json({ status: "error", message: "Internal Server Error" })
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT || 3001}`);
})
