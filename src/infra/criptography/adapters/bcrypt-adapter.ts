import {Encrypter,CompareEncryptHash} from '../../../data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter,CompareEncryptHash{
    async encrypter(value: string){
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(value,salt)
    }
    
    async compare(value: string, valueHashed: string):Promise<boolean>{
        return await bcrypt.compare(value,valueHashed)
    }
}