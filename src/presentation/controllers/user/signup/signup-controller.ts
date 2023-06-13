import {Controller,HttpRequest,HttpResponse} from '../../../protocols'
import {MissingParamError} from '../../../errors'
import {BadRequest} from '../../../errors/helpers'

export class SignupController implements Controller{
    async action(httpRequest:HttpRequest): Promise<HttpResponse>{
        return BadRequest(new MissingParamError('name'))
    }
}