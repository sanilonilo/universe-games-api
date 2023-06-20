import {Game} from '../../../entities'

export interface ReadAllGameUsecase{
    readAll: (options:any) => Promise<Game[]>
}