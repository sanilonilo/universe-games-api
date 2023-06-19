import {Category} from '../../../entities'

export interface ReadCategoryGameUseCase{
    read:(identifier:any) => Promise<Category>
}