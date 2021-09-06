import express from 'express';
import {addTask, getTask, getTasks} from './controller'

const Router = express.Router();

Router.get('/', (_, res) => {
  res.status(200).send({
    message: 'Welcome to Todo v1.000',
  });
});

Router.get('/task', getTasks);
Router.post('/task', addTask);
Router.get('/task/:id', getTask);
Router.get('/task/:id', getTask);




export default Router;
