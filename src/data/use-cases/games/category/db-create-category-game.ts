import { GameDTO } from '../../../DTOs';
import {CreateCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import {GameRepository} from '../../../repositories'

export class DbCreateCategoryGame implements CreateCategoryGameUseCase{
    constructor(public createCategoryRepository:GameRepository.Category.CreateCategory){}

    async create(dto: GameDTO.DataEntry.Category.Create):Promise<GameDTO.DataOutput.Category.Read>{
        return await this.createCategoryRepository.create(dto)
    }

}