const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { mainRouter } = require("./src/app/router.js");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/", mainRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
