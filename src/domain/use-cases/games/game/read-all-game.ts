import {Game} from '../../../entities'

export interface ReadAllGameUseCase{
    readAll: (options:any) => Promise<{data:Game[]}>
}