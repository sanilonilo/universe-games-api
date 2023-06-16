import {GameRepository} from '../../../../../../data/repositories'
import { GameDTO } from '../../../../../../data/DTOs';
import {database} from '../../../knex/database'

export class CreateCategoryPostgresRepository implements GameRepository.Category.CreateCategory{
    async create(dto: GameDTO.DataEntry.Category.Create): Promise<GameDTO.DataOutput.Category.Read>{
        const categoryCreated = await database.table('game-categories').returning(['id','name']).insert<GameDTO.DataOutput.Category.Read[]>(dto)
        return categoryCreated[0]
    }
}