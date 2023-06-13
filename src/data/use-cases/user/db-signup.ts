import { UserDTO } from '../../../domain/use-cases/DTOs';
import {CreateUserUseCase} from '../../../domain/use-cases/user'
import {Encrypter} from '../../protocols'

export class DbSignup implements CreateUserUseCase{

    constructor(public encrypter:Encrypter){}

    async create(dto: UserDTO.DataEntry.Create){
        await this.encrypter.encrypter(dto.password)
        return new Promise<UserDTO.DataOutput.Read>(resolve => resolve({
            id: 1,
            name:'name_test',
            email:'email_test'
        }))
    }
}