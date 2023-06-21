import {Game} from '../../../entities'

export interface UpdateGameUseCase{
    update: (dto:Game) => Promise<Game>
}