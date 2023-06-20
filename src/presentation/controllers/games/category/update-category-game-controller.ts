import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { UpdateCategoryGameUseCase } from '../../../../domain/use-cases/games/category'
import { BadRequest, ServerError } from '../../../errors/helpers'
import { MissingParamError } from '../../../errors'
import { Category } from '../../../../domain/entities'

export class UpdateCategoryGameController implements Controller {
    constructor(private readonly updateCategoryGameUseCase: UpdateCategoryGameUseCase) { }
    async action(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['id','name']
            
            for(let i = 0; i < requiredFields.length; i++)
                if(!httpRequest.body[requiredFields[i]]) return BadRequest(new MissingParamError(requiredFields[i]))

            const response = await this.updateCategoryGameUseCase.update({id:httpRequest.body.id,name:httpRequest.body.name } as Category)

            return {
                status: 200,
                body: response
            }
        } catch (error) {
            return ServerError('Server error')
        }

    }
}