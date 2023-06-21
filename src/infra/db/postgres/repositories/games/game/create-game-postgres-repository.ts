import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class CreateGamePostgresRepository implements GameRepository.Game.CreateGame{
    async create(dto: GameDTO.DataEntry.Game.Create): Promise<GameDTO.DataOutput.Game.Read>{
        const game = await database.table('games').returning(['id','name','description','image_url','trailer_url','category_id']).insert<GameDTO.DataOutput.Game.Read[]>(dto)
        return game[0]
    }
}