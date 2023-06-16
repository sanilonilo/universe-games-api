import {GameDTO} from '../../DTOs'

export interface UpdateCategoryGameUseCase{
    update:(dto:GameDTO.DataEntry.Category.Update) => Promise<GameDTO.DataOutput.Category.Read>
}