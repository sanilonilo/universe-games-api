import {Controller,HttpRequest} from '../../../presentation/protocols'
import {Request,Response} from 'express'
 
export const routeAdapter = (controller:Controller) => {
    return async (req:Request,res:Response) => {
        const httpRequest:HttpRequest = {body: req.body}    
        const httpResponse = await controller.action(httpRequest)
        return res.status(httpResponse.status).send(httpResponse.body || !!httpResponse.body)
    }
}