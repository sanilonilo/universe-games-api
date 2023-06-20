import {Game} from '../../../entities'

export interface ReadGameUsecase{
    read: (identifier:any) => Promise<Game>
}