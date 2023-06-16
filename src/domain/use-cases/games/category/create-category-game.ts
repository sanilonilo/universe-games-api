import {GameDTO} from '../../DTOs'

export interface CreateCategoryGame{
    create:(dto:GameDTO.DataEntry.Category.Create) => Promise<GameDTO.DataOutput.Category.Read>
}