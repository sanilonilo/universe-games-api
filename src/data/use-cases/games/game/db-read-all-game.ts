import { Game } from '../../../../domain/entities';
import {ReadAllGameUseCase} from '../../../../domain/use-cases/games/game'
import {GameRepository} from '../../../repositories'

export class DbReadAllGame implements ReadAllGameUseCase{
    constructor(public readAllGameRepository:GameRepository.Game.ReadAllGame){}
    async readAll (options:any): Promise<{data:Game[]}>{
        return await this.readAllGameRepository.readAll(options)
    }
}