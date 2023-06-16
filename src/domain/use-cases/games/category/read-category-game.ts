import {GameDTO} from '../../DTOs'

export interface ReadCategoryGame{
    read:(dto:GameDTO.DataEntry.Category.Read) => Promise<GameDTO.DataOutput.Category.Read>
}