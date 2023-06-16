import {Category} from '../../entities'

export namespace GameDTO{
    export namespace DataEntry{
        export namespace Category{
            export interface Read{
                id: any
            }
    
            export interface Create extends Category{}
    
            export interface Update{
                id: any
                name: string
            }
    
            export interface Delete{
                id: any
            }
        }
    }

    export namespace DataOutput{
        export namespace Category{
            export interface Read{
                id: any
                name: string
            }
        }
    }
}