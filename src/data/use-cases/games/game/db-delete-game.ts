import {DeleteGameUseCase} from '../../../../domain/use-cases/games/game'
import {GameRepository} from '../../../repositories'

export class DbDeleteGame implements DeleteGameUseCase{
    constructor(public deleteGameRepository:GameRepository.Game.DeleteGame){}
    async delete (identifier: any): Promise<any>{
        return await this.deleteGameRepository.delete(identifier)
    }
}