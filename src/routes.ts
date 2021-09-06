import express from 'express'
import {addTask, getTask, getTasks, removeTask, updateTaskStatus, deleteAllTask} from './controller'

const Router = express.Router();

Router.get('/', (_, res) => {
  res.status(200).send({
    message: 'Welcome to Todo v1.000',
  })
})

Router.get('/task', getTasks);
Router.post('/task', addTask);
Router.get('/task/:id', getTask);
Router.put('/task/:id', updateTaskStatus)
Router.delete('/task/:id', removeTask)
Router.delete('/task/', deleteAllTask)



export default Router
