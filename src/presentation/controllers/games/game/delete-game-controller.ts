import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { DeleteGameUseCase } from '../../../../domain/use-cases/games/game'
import { BadRequest, ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'

export class DeleteGameController implements Controller {
    constructor(private readonly deleteGameUseCase: DeleteGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.body.id

            if (!id) return BadRequest(new MissingParamError('id'))

            const response = await this.deleteGameUseCase.delete(httpRequest.body)

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }
    }
}