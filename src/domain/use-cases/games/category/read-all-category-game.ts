import {Category} from '../../../entities'

export interface ReadAllCategoryGameUseCase{
    readAll:() => Promise<Category[]>
}