
export namespace GameDTO{
    export namespace DataEntry{
        export namespace Category{
            export interface Read{
                id: any
            }
    
            export interface Create{
                name: string
            }
    
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