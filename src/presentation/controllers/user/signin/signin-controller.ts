import {Controller, HttpRequest, HttpResponse} from '../../../protocols'
import {BadRequest} from '../../../errors/helpers'
import {MissingParamError} from '../../../errors'

export class SigninController implements Controller{
    async action(httpRequest: HttpRequest):Promise<HttpResponse>{
        const requiredFields = ['email','password']

        for(let i = 0; i < requiredFields.length; i++)
            if(!httpRequest.body[requiredFields[i]])
                return BadRequest(new MissingParamError(requiredFields[i]))
    }
}