import { Game } from '../../../../domain/entities';
import {UpdateGameUseCase} from '../../../../domain/use-cases/games/game'
import {GameRepository} from '../../../repositories'
import {GameDTO} from '../../../DTOs'

export class DbUpdateGame implements UpdateGameUseCase{
    constructor(public updateGameRepository:GameRepository.Game.UpdateGame){}
    async update (dto: Game): Promise<Game>{
        return await this.updateGameRepository.update(dto as GameDTO.DataEntry.Game.Update)
    }
}