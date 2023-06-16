import {GameDTO} from '../../DTOs'

export interface UpdateCategoryGame{
    update:(dto:GameDTO.DataEntry.Category.Update) => Promise<GameDTO.DataOutput.Category.Read>
}