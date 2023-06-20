import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class ReadAllCategoryPostgresRepository implements GameRepository.Category.ReadAllCategory{
    async readAll():Promise<GameDTO.DataOutput.Category.Read[]>{
        const categoriesDB = await database.table('game-categories').select<GameDTO.DataOutput.Category.Read[]>('*')
        return categoriesDB
    }
}