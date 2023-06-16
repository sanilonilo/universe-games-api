import {Category} from '../../../entities'

export interface DeleteCategoryGameUseCase{
    delete:(dto:Category) => Promise<any>
}