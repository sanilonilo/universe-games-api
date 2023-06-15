import {UserDTO} from '../../domain/use-cases/DTOs'

export namespace UserRepository{
    export interface CreateUser{
        create:(dto: UserDTO.DataEntry.Create) => Promise<UserDTO.DataOutput.Read>
    }
    export interface AuthUser{
        auth:(dto: UserDTO.DataEntry.Auth) => Promise<UserDTO.DataOutput.Read>
    }
}