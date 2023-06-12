import {UserDTO} from '../DTOs'

export interface CreateUserUseCase{
    create:(dto: UserDTO.DataEntry.CreateDTO) => Promise<UserDTO.DataOutput.ReadDTO>
}