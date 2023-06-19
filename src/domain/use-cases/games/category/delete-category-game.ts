import {Category} from '../../../entities'

export interface DeleteCategoryGameUseCase{
    delete:(identifier:any) => Promise<any>
}