import {GameDTO} from '../../DTOs'

export interface CreateCategoryGameUseCase{
    create:(dto:GameDTO.DataEntry.Category.Create) => Promise<GameDTO.DataOutput.Category.Read>
}