import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class ReadCategoryPostgresRepository implements GameRepository.Category.ReadCategory{
    async read(dto: GameDTO.DataEntry.Category.Read):Promise<GameDTO.DataOutput.Category.Read>{
        const categoryDB = await database.table('game-categories').select('*').where({id:dto.id}).first<GameDTO.DataOutput.Category.Read>()
        return categoryDB
    }
}