import { UserDTO } from '../../../domain/use-cases/DTOs';
import {AuthUserUseCase} from '../../../domain/use-cases/user'
import {CompareEncryptHash} from '../../protocols'
import {UserRepository} from '../../repositories'

export class DbAuthUser implements AuthUserUseCase{

    constructor(
        public compareEncryptHash:CompareEncryptHash,
        public authUserRepository: UserRepository.AuthUser
    ){}

    async auth(dto: UserDTO.DataEntry.Auth):Promise<UserDTO.DataOutput.Authenticated>{
        const userDB = await this.authUserRepository.auth(dto)
        const isMatchPassword = await this.compareEncryptHash.compare(dto.password,userDB.password)

        return {
            email:'name_test',
            name:'name_test',
            token:'token_test'
        }
    }

    
}