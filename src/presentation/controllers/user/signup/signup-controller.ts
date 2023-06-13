import {Controller,HttpRequest,HttpResponse,EmailValidator} from '../../../protocols'
import {MissingParamError} from '../../../errors'
import {BadRequest} from '../../../errors/helpers'

export class SignupController implements Controller{

    constructor(private readonly emailValidator:EmailValidator){}

    async action(httpRequest:HttpRequest): Promise<HttpResponse>{
        const requiredFields = ['name','email','password','confirm_password']

        for(let i = 0; i < requiredFields.length; i++)
            if(!httpRequest.body[requiredFields[i]]) 
                return BadRequest(new MissingParamError(requiredFields[i]))
        
        if(httpRequest.body['password'].trim() !== httpRequest.body['confirm_password'].trim())
            return BadRequest(new Error('Password and password confirmation do not confer'))  
            
        const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)

        if(!isValidEmail) return BadRequest(new Error('Invalid param email'))
    }
}