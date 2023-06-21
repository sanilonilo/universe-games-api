import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class UpdateGamePostgresRepository implements GameRepository.Game.UpdateGame{
    async update(dto: GameDTO.DataEntry.Game.Update): Promise<GameDTO.DataOutput.Game.Read>{
        const game = await database.table('games').returning(['id','name','description','image_url','trailer_url','category_id']).update<GameDTO.DataOutput.Game.Read[]>(dto).where({id:dto.id})
        return game[0]
    }
}