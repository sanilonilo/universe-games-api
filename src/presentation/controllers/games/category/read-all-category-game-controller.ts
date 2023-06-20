import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { ReadAllCategoryGameUseCase } from '../../../../domain/use-cases/games/category'
import { ServerError } from '../../../errors/helpers'

export class ReadAllCategoryGameController implements Controller {
    constructor(private readonly readAllCategoryGameUseCase: ReadAllCategoryGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const response = await this.readAllCategoryGameUseCase.readAll()

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }

    }
}