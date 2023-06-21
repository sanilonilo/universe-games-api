import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class ReadGamePostgresRepository implements GameRepository.Game.ReadGame{
    async read(identifier:any): Promise<GameDTO.DataOutput.Game.Read>{
        const game = await database.table('games').select('*').where({id:identifier.id}).first<GameDTO.DataOutput.Game.Read>()
        return game
    }
}