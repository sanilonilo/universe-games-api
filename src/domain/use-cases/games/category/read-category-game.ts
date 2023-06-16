import {GameDTO} from '../../DTOs'

export interface ReadCategoryGameUseCase{
    read:(dto:GameDTO.DataEntry.Category.Read) => Promise<GameDTO.DataOutput.Category.Read>
}