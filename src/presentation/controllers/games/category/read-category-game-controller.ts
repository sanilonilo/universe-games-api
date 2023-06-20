import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { ReadCategoryGameUseCase } from '../../../../domain/use-cases/games/category'
import { BadRequest, ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'

export class ReadCategoryGameController implements Controller {
    constructor(private readonly readCategoryGameUseCase: ReadCategoryGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.body.id
            if (!id) return BadRequest(new MissingParamError('id'))
            const response = await this.readCategoryGameUseCase.read({id:httpRequest.body.id})

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }

    }
}