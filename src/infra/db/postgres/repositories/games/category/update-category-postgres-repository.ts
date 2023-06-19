import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class UpdateCategoryPostgresRespository implements GameRepository.Category.UpdateCategory{
    async update(dto: GameDTO.DataEntry.Category.Update):Promise<GameDTO.DataOutput.Category.Read>{
        const categoryUpdated = await database.table('game-categories').returning(['id','name']).update<GameDTO.DataOutput.Category.Read[]>({name:dto.name}).where({id:dto.id})
        return categoryUpdated[0]
    }
}