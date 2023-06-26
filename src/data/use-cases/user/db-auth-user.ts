import { UserDTO } from '../../DTOs';
import {AuthUserUseCase} from '../../../domain/use-cases/user'
import {CompareEncryptHash,EncodeTokenJWT} from '../../protocols'
import {UserRepository} from '../../repositories'

const SECRET_KEY = process.env?.SECRET_KEY.toString().trim()

export class DbAuthUser implements AuthUserUseCase{

    constructor(
        public compareEncryptHash:CompareEncryptHash,
        public authUserRepository: UserRepository.AuthUser,
        public encodeToken:EncodeTokenJWT
    ){}

    async auth(dto: UserDTO.DataEntry.Auth):Promise<UserDTO.DataOutput.Authenticated>{
        const userDB = await this.authUserRepository.auth(dto)

        if(!userDB) return null 

        const isMatchPassword = await this.compareEncryptHash.compare(dto.password,userDB.password)

        if(!isMatchPassword) return {email:null,name:null,token:null}

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: userDB.id,
            name: userDB.name,
            email: userDB.email,
            admin: userDB.role === 'admin',
            iat: now,
            exp: now + (60 * 60 * 24)
        }

        const token = await this.encodeToken.encode(payload,SECRET_KEY)

        return {
            name:userDB.name,
            email:userDB.email,
            token
        }
    }

    
}