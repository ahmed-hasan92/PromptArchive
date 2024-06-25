const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const mongoConnection = require("./dataBase");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const userRoutes = require("./api/user/user.routes");
const docRoutes = require("./api/doc/doc.routes");
const textGeneratorRoutes = require("./api/textGenerator/textGenerator.routes");
require("dotenv").config();
const port = process.env.PORT;
const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
app.use("/api", userRoutes);
app.use("/api", docRoutes);
app.use("/api", textGeneratorRoutes);

app.use(errorHandler);
app.use(notFound);

mongoConnection();
app.listen(port, () => {
  console.log(`The app works on port: ${port}`);
});
