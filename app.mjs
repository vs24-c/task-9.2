import express from "express";
import routes from "./routes/index.mjs";
import connect from './db/connect.mjs';
import middleware from "./middleware/index.mjs";
import errorHandler from "./middleware/errorHandler.mjs";

const app = express();

// Connect to Mongo DB
connect() 
// Connect Middleware
middleware(app)
// Connect Routers
app.use('/', routes);
// Connect ErrorHandler
errorHandler(app)

export default app;
