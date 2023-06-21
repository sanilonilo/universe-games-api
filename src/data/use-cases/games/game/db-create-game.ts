import { Game } from '../../../../domain/entities';
import {CreateGameUsecase} from '../../../../domain/use-cases/games/game'
import {GameRepository} from '../../../repositories'

export class DbCreateGame implements CreateGameUsecase{
    constructor(public createGameRepository:GameRepository.Game.CreateGame){}
    async create (dto: Game): Promise<Game>{
        return await this.createGameRepository.create(dto)
    }
}