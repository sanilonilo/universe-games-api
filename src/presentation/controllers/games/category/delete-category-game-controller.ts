import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { DeleteCategoryGameUseCase } from '../../../../domain/use-cases/games/category'
import { BadRequest, ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'

export class DeleteCategoryGameController implements Controller {
    constructor(private readonly deleteCategoryGameUseCase: DeleteCategoryGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const id = httpRequest.body.id
            if (!id) return BadRequest(new MissingParamError('id'))
            const response = await this.deleteCategoryGameUseCase.delete({id:httpRequest.body.id})

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }

    }
}