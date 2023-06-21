import { Game } from '../../../../domain/entities';
import {ReadGameUseCase} from '../../../../domain/use-cases/games/game'
import {GameRepository} from '../../../repositories'

export class DbReadGame implements ReadGameUseCase{
    constructor(public readGameRepository:GameRepository.Game.ReadGame){}
    async read (identifier: any): Promise<Game>{
        return await this.readGameRepository.read(identifier)
    }
}