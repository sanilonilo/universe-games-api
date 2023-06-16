import {GameDTO} from '../DTOs'

export namespace GameRepository{
    export namespace Category{
        export interface ReadCategory{
            read:(dto: GameDTO.DataEntry.Category.Read) => Promise<GameDTO.DataOutput.Category.Read>
        }

        export interface CreateCategory{
            create:(dto: GameDTO.DataEntry.Category.Create) => Promise<GameDTO.DataOutput.Category.Read>
        }

        export interface UpdateCategory{
            update:(dto: GameDTO.DataEntry.Category.Update) => Promise<GameDTO.DataOutput.Category.Read>
        }

        export interface DeleteCategory{
            delete:(dto: GameDTO.DataEntry.Category.Delete) => Promise<any>
        }
    }
}