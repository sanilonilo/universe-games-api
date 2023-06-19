import {DeleteCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import {GameRepository} from '../../../repositories'

export class DbDeleteCategoryGame implements DeleteCategoryGameUseCase{
    constructor(public deleteCategoryGameRepository:GameRepository.Category.DeleteCategory){}
    async delete(identifier: any):Promise<any>{
        return await this.deleteCategoryGameRepository.delete(identifier)
    }
}