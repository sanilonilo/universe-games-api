import { Game } from '../../../../domain/entities';
import {CreateGameUsecase} from '../../../../domain/use-cases/games/game'
import {GameRepository} from '../../../repositories'

export class DbCreateGame implements CreateGameUsecase{
    constructor(public gameRepository:GameRepository.Game.CreateGame){}
    async create (dto: Game): Promise<Game>{
        return await this.gameRepository.create(dto)
    }
}