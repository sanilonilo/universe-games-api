import {Category} from '../../../entities'

export interface CreateCategoryGameUseCase{
    create:(dto:Category) => Promise<Pick<Category,'name'>>
}