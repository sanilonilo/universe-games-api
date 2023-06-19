import { Category } from '../../../../domain/entities';
import {ReadAllCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import {GameRepository} from '../../../repositories'

export class DbReadAllCategoryGame implements ReadAllCategoryGameUseCase{
    constructor(public readAllCategoryGameRepository:GameRepository.Category.ReadAllCategory){}
    async readAll():Promise<Category[]>{
        return await this.readAllCategoryGameRepository.readAll()
    }
}