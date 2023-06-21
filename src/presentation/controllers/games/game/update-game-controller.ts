import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { UpdateGameUseCase } from '../../../../domain/use-cases/games/game'
import { BadRequest, ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'

export class UpdateGameController implements Controller {
    constructor(private readonly updateGameUseCase: UpdateGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['id','name', 'description', 'image_url']

            for (let i = 0; i < requiredFields.length; i++)
                if (!httpRequest.body[requiredFields[i]]) return BadRequest(new MissingParamError(requiredFields[i]))

            const response = await this.updateGameUseCase.update(httpRequest.body)

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }
    }
}