import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { BadRequest,ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'
import { AuthUserUseCase } from '../../../../domain/use-cases/user'

export class SigninController implements Controller {

    constructor(private readonly authUserUseCase: AuthUserUseCase) { }

    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['email', 'password']

            for (let i = 0; i < requiredFields.length; i++)
                if (!httpRequest.body[requiredFields[i]])
                    return BadRequest(new MissingParamError(requiredFields[i]))

            const payload = await this.authUserUseCase.auth(httpRequest.body)

            return { status: 200, body: payload }
        } catch (error) {
            return ServerError('Server error')
        }
    }
}