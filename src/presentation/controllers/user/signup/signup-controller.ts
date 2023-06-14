import { Controller, HttpRequest, HttpResponse, EmailValidator } from '../../../protocols'
import { MissingParamError, InvalidParamError } from '../../../errors'
import { BadRequest } from '../../../errors/helpers'
import { CreateUserUseCase } from '../../../../domain/use-cases/user'

export class SignupController implements Controller {

    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly createUserUseCase: CreateUserUseCase
    ) { }

    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password', 'confirm_password']

            for (let i = 0; i < requiredFields.length; i++)
                if (!httpRequest.body[requiredFields[i]])
                    return BadRequest(new MissingParamError(requiredFields[i]))

            if (httpRequest.body['password'].trim() !== httpRequest.body['confirm_password'].trim())
                return BadRequest(new Error('Password and password confirmation do not confer'))

            const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)

            if (!isValidEmail) return BadRequest(new InvalidParamError('email'))

            const response = await this.createUserUseCase.create(httpRequest.body)

            return {
                body: response,
                status: 200
            }
        }
        catch (error) {
            return {
                body:null,
                status:500
            }
        }
    }
}