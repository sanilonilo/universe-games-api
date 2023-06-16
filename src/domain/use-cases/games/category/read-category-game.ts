import {Category} from '../../../entities'

export interface ReadCategoryGameUseCase{
    read:(dto:Category) => Promise<Category>
}