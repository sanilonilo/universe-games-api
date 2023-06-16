import {UserDTO} from '../DTOs'

export namespace UserRepository{
    export interface CreateUser{
        create:(dto: UserDTO.DataEntry.Create) => Promise<UserDTO.DataOutput.Read>
    }
    export interface AuthUser{
        auth:(dto: UserDTO.DataEntry.Auth) => Promise<UserDTO.DataOutput.ToAuth | null>
    }
}