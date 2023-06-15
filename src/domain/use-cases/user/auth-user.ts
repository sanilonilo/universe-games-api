import {UserDTO} from '../DTOs'

export interface AuthUserUseCase{
    auth:(dto: UserDTO.DataEntry.Auth) => Promise<UserDTO.DataOutput.Authenticated | null>
}