import {Controller, HttpRequest, HttpResponse} from '../../../protocols'
import {ServerError} from '../../../errors/helpers'

export class ValidateTokenController implements Controller{
    async action(httpRequest: HttpRequest): Promise<HttpResponse>{
        return {status:201,body:{valid:true}}
    }
}