import {Game} from '../../../entities'

export interface CreateGameUsecase{
    create: (dto:Game) => Promise<Game>
}