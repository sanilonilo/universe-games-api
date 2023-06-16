import {GameDTO} from '../../DTOs'

export interface DeleteCategoryGameUseCase{
    delete:(dto:GameDTO.DataEntry.Category.Delete) => Promise<any>
}