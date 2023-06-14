import {UserRepository} from '../../../../../data/repositories'
import { UserDTO } from '../../../../../domain/use-cases/DTOs';
import {database} from '../../knex/database'

export class CreateUserPostgresRepository implements UserRepository.CreateUser{
    async create(dto: UserDTO.DataEntry.Create): Promise<UserDTO.DataOutput.Read>{
        const userCreated = await database.table('users').returning(['id','name','email']).insert<UserDTO.DataOutput.Read[]>(dto)
        return userCreated[0]
    }
}