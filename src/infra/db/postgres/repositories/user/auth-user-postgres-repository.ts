import {UserRepository} from '../../../../../data/repositories'
import { UserDTO } from '../../../../../domain/use-cases/DTOs';
import {database} from '../../knex/database'

export class AuthUserPostgresRepository implements UserRepository.AuthUser{
    async auth(dto: UserDTO.DataEntry.Auth): Promise<UserDTO.DataOutput.ToAuth>{
        const userDB = await database
                        .table('users')
                        .select('id','name','email','password')
                        .where({email:dto.email})
                        .first()
       
        return userDB || null            
    }
}