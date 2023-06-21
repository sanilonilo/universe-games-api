import {Game} from '../../../entities'

export interface ReadGameUseCase{
    read: (identifier:any) => Promise<Game>
}