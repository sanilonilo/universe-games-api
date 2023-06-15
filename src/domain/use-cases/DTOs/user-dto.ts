export namespace UserDTO{
    
    export namespace DataEntry{
        export interface Create{
            name: string
            email: string
            password: string
        }
        
        export interface Auth{
            email: string
            password: string
        }
    }

    export namespace DataOutput{
        export interface Read{
            id: any
            name: string
            email: string
        }
        
    }
}