import {GameDTO} from '../../DTOs'

export interface DeleteCategoryGame{
    delete:(dto:GameDTO.DataEntry.Category.Delete) => Promise<void>
}