import {Category} from '../../../entities'

export interface UpdateCategoryGameUseCase{
    update:(dto:Category) => Promise<Category>
}