import {Controller, HttpRequest, HttpResponse} from '../../../protocols'
import {ServerError} from '../../../errors/helpers'

export class ValidateTokenController implements Controller{
    async action(httpRequest: HttpRequest): Promise<HttpResponse>{
        try {
            return {status:201,body:{valid:true}}
        } catch (error) {
            return ServerError('Server error')
        }
    }
}