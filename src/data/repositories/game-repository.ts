import {GameDTO} from '../DTOs'

export namespace GameRepository{
    export namespace Category{
        export interface ReadCategory{
            read:(dto: GameDTO.DataEntry.Category.Read) => Promise<GameDTO.DataOutput.Category.Read>
        }

        export interface ReadAllCategory{
            readAll:() => Promise<GameDTO.DataOutput.Category.Read[]>
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

    export namespace Game{
        export interface ReadGame{
            read:(dto: GameDTO.DataEntry.Game.Read) => Promise<GameDTO.DataOutput.Game.Read>
        }

        export interface ReadAllGame{
            readAll:(dto: GameDTO.DataEntry.Game.ReadAll) => Promise<GameDTO.DataOutput.Game.ReadAll>
        }

        export interface CreateGame{
            create:(dto: GameDTO.DataEntry.Game.Create) => Promise<GameDTO.DataOutput.Game.Read>
        }

        export interface UpdateGame{
            update:(dto: GameDTO.DataEntry.Game.Update) => Promise<GameDTO.DataOutput.Game.Read>
        }

        export interface DeleteGame{
            delete:(dto: GameDTO.DataEntry.Game.Delete) => Promise<any>
        }
    }
}