
import express, { urlencoded, json, Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { log } from 'debug';
import { config } from 'dotenv';
import Routes from './routes';


config();

mongoose.connect(process.env.MONGO_URI!, (err) => {
  err ? log(`error connecting to db ${err}`) : log('database connected');
});



const app:Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(Routes);

const port = process.env.PORT || 3000

log(`app running in ${process.env.NODE_ENV?.toUpperCase()} environment.`);
app.listen(port, () => log(`Running on port ${port}.`));

export default app;
