export namespace UserDTO{
    export namespace DataEntry{
        export interface CreateDTO{
            name: string
            email: string
            password: string
        }
        
        export interface SigninDTO{
            email: string
            password: string
        }
    }

    export namespace DataOutput{
        export interface ReadDTO{
            name: string
            email: string
        }
        
    }
}