import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class DeleteGamePostgresRepository implements GameRepository.Game.DeleteGame{
    async delete(identifier:any): Promise<any>{
        const game = await database.table('games').where({id:identifier.id}).del()
        return game ? true : false
    }
}