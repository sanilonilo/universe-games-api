import {Express} from 'express'
import {bodyParser,cors,session} from './middlewares'

export default (app:Express):void => {
 app.use(session)
 app.use(bodyParser)
 app.use(cors)   
}