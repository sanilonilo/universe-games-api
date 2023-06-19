import { Category } from '../../../../domain/entities';
import {ReadCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import {GameRepository} from '../../../repositories'

export class DbReadCategoryGame implements ReadCategoryGameUseCase{
    constructor(public readCategoryGameRepository:GameRepository.Category.ReadCategory){}
    async read(identifier: any):Promise<Category>{
        return await this.readCategoryGameRepository.read(identifier)
    }
}