import { Game } from '../../../../domain/entities';
import {CreateGameUseCase} from '../../../../domain/use-cases/games/game'
import {GameRepository} from '../../../repositories'

export class DbCreateGame implements CreateGameUseCase{
    constructor(public createGameRepository:GameRepository.Game.CreateGame){}
    async create (dto: Game): Promise<Game>{
        return await this.createGameRepository.create(dto)
    }
}