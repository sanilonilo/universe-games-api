import {Game} from '../../../entities'

export interface UpdateGameUsecase{
    update: (dto:Game) => Promise<Game>
}