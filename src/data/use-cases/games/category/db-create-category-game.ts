import { GameDTO } from '../../../DTOs';
import {CreateCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import {GameRepository} from '../../../repositories'
import { Category } from '../../../../domain/entities';

export class DbCreateCategoryGame implements CreateCategoryGameUseCase{
    constructor(public createCategoryRepository:GameRepository.Category.CreateCategory){}

    async create(dto: Category):Promise<Category>{
        return await this.createCategoryRepository.create(dto)
    }

}