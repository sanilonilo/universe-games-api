import {UserDTO} from '../DTOs'

export interface CreateUserUseCase{
    create:(dto: UserDTO.DataEntry.Create) => Promise<UserDTO.DataOutput.Read>
}