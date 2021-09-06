import {TaskType, Task, TaskSchema} from './model/Task'
import {Response, Request} from 'express'


const errorResponse = (res:Response, {message, code, data}
  :{message: string, code: number, data?: Array<any>|object}) => res.status(code).send({
    message,
    status: 'error',
    code,
    data
  })

const successResponse = (res:Response, {message, code=200, data}
  :{message: string, code: number, data?: Array<TaskType>|TaskType}) => res.status(code).send({
    message,
    status: 'success',
    code,
    data
  })

export const addTask = async (req: Request, res:Response) => {
  try {
    const payload = req.body as TaskType
    const  task:TaskType = await Task.create(payload)
    return  successResponse(res, {message: 'task added', code: 201, data: task})
  } catch (error) {
    return errorResponse(res, { message: error.message, code: 500})
  }
}

export const removeTask = async(req: Request, res:Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    return  successResponse(res, {message: 'task deleted', code: 204})
  } catch (error) {
    return errorResponse(res, { message: error.message, code: 500,})
  }
}

export const updateTaskStatus = async(req: Request, res:Response) => {
  try {
    const status = req.body.status as TaskType["status"]
    const task = await Task.findByIdAndUpdate(req.params.id, {status}, {new: true}) as TaskType
    return  successResponse(res, {message: 'task deleted', code: 204, data: task})
  } catch (error) {
    return errorResponse(res, { message: error.message, code: 500, data: {}})
  }
}


export const getTasks = async(req: Request, res:Response) => {
  try {
    const status = req.query.status as TaskType["status"]
    const task = status ? await Task.find({status}).sort('-createdAt') : await Task.find().sort('-createdAt')
    return  successResponse(res, {message: 'tasks fetched', code: 204, data: task})
  } catch (error) {
    return errorResponse(res, { message: error.message, code: 500, data: {}})
  }
}

export const getTask = async(req: Request, res:Response) => {
  try {
    const task = await Task.findById(req.params.id) as TaskType
    return  successResponse(res, {message: 'tasks fetched', code: 200, data: task})
  } catch (error) {
    return errorResponse(res, { message: error.message, code: 500, data: {}})
  }
}

