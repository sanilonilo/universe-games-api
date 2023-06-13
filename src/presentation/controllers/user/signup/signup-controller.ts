import {Controller,HttpRequest,HttpResponse} from '../../../protocols'
import {MissingParamError} from '../../../errors'
import {BadRequest} from '../../../errors/helpers'

export class SignupController implements Controller{
    async action(httpRequest:HttpRequest): Promise<HttpResponse>{
        const requiredFields = ['name','email','password','confirm_password']

        for(let i = 0; i < requiredFields.length; i++){
            if(!httpRequest.body[requiredFields[i]]) 
                return BadRequest(new MissingParamError(requiredFields[i]))
        }
    }
}