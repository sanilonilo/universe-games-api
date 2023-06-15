import {Controller, HttpRequest, HttpResponse} from '../../../protocols'


export class ValidateTokenController implements Controller{
    async action(httpRequest: HttpRequest): Promise<HttpResponse>{
        return {status:201,body:{valid:true}}
    }
}