import {Encrypter} from '../../../data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter{
    async encrypter(value: string){
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(value,salt)
    }
}