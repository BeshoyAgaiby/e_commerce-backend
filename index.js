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

const startServer = async () => {
  try {
    await dbConnection();   // نستنى الاتصال الأول
    app.listen(port, () =>
      console.log(`Server running at port ${port}`)
    );
  } catch (error) {
    console.log("Failed to connect DB:", error);
  }
};

startServer();



app.listen(port, () => console.log(`server is running at port ${port}`))
