
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

        export namespace Game{
            export interface Read{
                id: any
            }

            export interface ReadAll{
                page: number
            }
    
            export interface Create{
                name: string
                description: string
                image_url: string
                trailer_url: string
            }
    
            export interface Update{
                id: any
                name: string
                description: string
                image_url: string
                trailer_url: string
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

        export namespace Game{
            export interface Read{
                id: any
                name: string
                description: string
                image_url: string
                trailer_url: string
            }

            export interface ReadAll{
                page: number
                total: number | string
                data: GameDTO.DataOutput.Game.Read[]
            }
        }
    }
}