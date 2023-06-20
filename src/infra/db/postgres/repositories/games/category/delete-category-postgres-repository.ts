import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class DeleteCategoryPostgresRepository implements GameRepository.Category.DeleteCategory{
    async delete(dto: GameDTO.DataEntry.Category.Delete):Promise<any>{
        const categoryDB = await database.table('game-categories').where({id:dto.id}).del()
        return categoryDB
    }
}