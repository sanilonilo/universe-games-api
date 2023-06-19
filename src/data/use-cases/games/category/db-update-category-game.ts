import { Category } from '../../../../domain/entities';
import {UpdateCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import {GameRepository} from '../../../repositories'
import {GameDTO} from '../../../DTOs'

export class DbUpdateCategoryGame implements UpdateCategoryGameUseCase{
    constructor(public updateCategoryGameRepository:GameRepository.Category.UpdateCategory){}
    async update(dto: Category):Promise<Category>{
        return await this.updateCategoryGameRepository.update(dto as GameDTO.DataEntry.Category.Update)
    }
}