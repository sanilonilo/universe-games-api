import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { CreateGameUseCase } from '../../../../domain/use-cases/games/game'
import { BadRequest, ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'

export class CreateGameController implements Controller {
    constructor(private readonly createGameUseCase: CreateGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['name', 'description', 'image_url']

            for (let i = 0; i < requiredFields.length; i++)
                if (!httpRequest.body[requiredFields[i]]) return BadRequest(new MissingParamError(requiredFields[i]))

            const response = await this.createGameUseCase.create(httpRequest.body)

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }
    }
}