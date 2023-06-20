import {Game} from '../../../entities'

export interface ReadAllGameUsecase{
    readAll: () => Promise<Game[]>
}