require('dotenv/config');
require('express-async-errors');
const express = require('express');
const AppError = require('./utils/AppError');
const database = require('./database/sqlite');
const cors = require('cors');
const uploadConfig = require("./configs/upload")

database();
const app = express();
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(cors());

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const routes = require('./routes');
app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
