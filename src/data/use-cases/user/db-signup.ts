import { UserDTO } from '../../../domain/use-cases/DTOs';
import {CreateUserUseCase} from '../../../domain/use-cases/user'
import {Encrypter} from '../../protocols'
import {UserRepository} from '../../repositories'

export class DbSignup implements CreateUserUseCase{

    constructor(public encrypter:Encrypter,public createUserRepository:UserRepository.CreateUser){}

    async create(dto: UserDTO.DataEntry.Create){
        const hashedPassword = await this.encrypter.encrypter(dto.password)
        return await this.createUserRepository.create(dto)
    }
}