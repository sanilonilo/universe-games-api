import {Controller} from '../../../protocols'

export class SignupController implements Controller{
    async action(httpRequest:any): any{
        return {
            status: 400,
            body: new Error('missing param name')
        }
    }
}