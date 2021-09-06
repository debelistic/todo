
import express, { urlencoded, json, Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { log } from 'debug';
import { config } from 'dotenv';
import Routes from './routes';


config();

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('bufferCommands', false);

mongoose.connect('', (err) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  err ? log(`error connecting to db ${err}`) : log('database connected');
});



const app:Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(Routes);

log(`app running in ${process.env.NODE_ENV?.toUpperCase()} environment.`);
export default app;
