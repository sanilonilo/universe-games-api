import {Request,Response,NextFunction} from 'express'

export default (middleware:(_req:Request,_res:Response,_next?:NextFunction) => void) => {
    return (req:Request,res:Response) => {
        if(req.user && req.user['admin']) middleware(req,res)
        else res.status(401).send()
    }
}