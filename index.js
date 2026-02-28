import express from 'express'
import { dbConnection } from './database/dbConnection.js';
import bootstrap from './src/utilities/bootstrap.js';
import dotenv from "dotenv"

// import morgan from 'morgan';
const app = express()
const port = process.env.PORT || 3000
dotenv.config()
app.use(express.json());

app.use('/uploads',express.static("uploads")); //to make uploads folder public
// app.use(morgan('dev'));


bootstrap(app);

dbConnection();



app.listen(port, () => console.log(`server is running at port ${port}`))
