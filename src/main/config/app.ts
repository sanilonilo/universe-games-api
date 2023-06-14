import express from 'express'
import setupMiddlewares from './setupMiddlewares'

const app = express()
setupMiddlewares(app)

export default app