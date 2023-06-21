import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { ReadAllGameUseCase } from '../../../../domain/use-cases/games/game'
import { ServerError } from '../../../errors/helpers'

export class ReadAllGameController implements Controller {
    constructor(private readonly readAllGameUseCase: ReadAllGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const response = await this.readAllGameUseCase.readAll(httpRequest.body)
            return {
                status: 200,
                body: response
            }

        } catch (error) {
            return ServerError('Server error')
        }
    }
}