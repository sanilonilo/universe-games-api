import {EncodeTokenJWT} from '../../../data/protocols'
import jwt from 'jwt-simple'

export class JwtSimpleAdapter implements EncodeTokenJWT{
    async encode(payload: any, secretKey: string):Promise<string>{
        return jwt.encode(payload,secretKey)
    }
}