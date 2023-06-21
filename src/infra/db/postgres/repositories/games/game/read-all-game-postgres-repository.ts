import { GameDTO } from '../../../../../../data/DTOs';
import {GameRepository} from '../../../../../../data/repositories'
import {database} from '../../../knex/database'

export class ReadAllGamePostgresRepository implements GameRepository.Game.ReadAllGame{
    async readAll(options:GameDTO.DataEntry.Game.ReadAll): Promise<GameDTO.DataOutput.Game.ReadAll>{
        const page = options.page || 1
        const count = await database('games').count('id').first()
        const total = parseInt(count.count as string)
        const limit = 20
        const games = await database
                            .select('games.*','game-categories.name as category')
                            .from('games')
                            .leftJoin('game-categories','games.category_id','game-categories.id')
                            .limit(limit)
                            .offset((page*limit) - limit)
        return {
            total,
            data: games,
            page
        }                    
    }
}