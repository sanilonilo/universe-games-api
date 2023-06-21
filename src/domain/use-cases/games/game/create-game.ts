import {Game} from '../../../entities'

export interface CreateGameUseCase{
    create: (dto:Game) => Promise<Game>
}