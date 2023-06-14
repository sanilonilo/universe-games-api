import {UserRepository} from '../../../../../data/repositories'
import { UserDTO } from '../../../../../domain/use-cases/DTOs';

export class CreateUserPostgresRepository implements UserRepository.CreateUser{
    async create(dto: UserDTO.DataEntry.Create): Promise<UserDTO.DataOutput.Read>{
        return {
            id:1,
            email:dto.email,
            name:dto.name
        }
    }
}