import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { CreateCategoryGameUseCase } from '../../../../domain/use-cases/games/category'
import { BadRequest, ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'

export class CreateCategoryGameController implements Controller {
    constructor(private readonly createCategoryGameUseCase: CreateCategoryGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const name = httpRequest.body.name
            if (!name.trim()) return BadRequest(new MissingParamError('name'))
            const response = await this.createCategoryGameUseCase.create({ name })

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }

    }
}