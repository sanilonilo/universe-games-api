import {CompareEncryptHash,EncodeTokenJWT} from '../../protocols'
import {DbAuthUser} from './'
import {UserRepository} from '../../repositories'
import { UserDTO } from '../../DTOs'

class EncodeTokenStub implements EncodeTokenJWT{
    encode(payload: any, secretKey: string):Promise<string>{
        return new Promise(resolve => resolve('encoded_token'))
    }
}

class CompareEncryptHashStub implements CompareEncryptHash{
    compare(value: string, valueHashed: string):Promise<boolean>{
        return new Promise(resolve => resolve(true))
    } 
}

class AuthUserRepositoryStub implements UserRepository.AuthUser{
    async auth(dto: UserDTO.DataEntry.Auth): Promise<UserDTO.DataOutput.ToAuth>{
        return new Promise(resolve => resolve({
            id:1,
            name:'name_test',
            email:'email@test',
            password:'hashed_password'
        }))
    }   
}

const makeSut = () => {
    const encodeToken = new EncodeTokenStub()
    const compareEncryptHashStub = new CompareEncryptHashStub()
    const authUserRepositoryStub = new AuthUserRepositoryStub()
    const sut = new DbAuthUser(compareEncryptHashStub,authUserRepositoryStub,encodeToken)
    return {
        sut,
        compareEncryptHashStub,
        authUserRepositoryStub,
        encodeToken
    }
}

describe('DbAuthUser',() => {

    test('User not found: return null', async () => {
        const {sut,authUserRepositoryStub} = makeSut()
        
        vi.spyOn(authUserRepositoryStub,'auth').mockResolvedValueOnce(null)

        const data = {
            email: 'email@test',
            password:'password_test'
        }

        const response = await sut.auth(data)

        expect(response).toEqual(null)
    })

    test('Compare hash: throw error', async () => {
        const {sut,compareEncryptHashStub} = makeSut()
        vi.spyOn(compareEncryptHashStub,'compare').mockReturnValueOnce(new Promise((_,reject) => reject(new Error())))

        await expect(compareEncryptHashStub.compare).rejects.toThrow()
    })

    test('Compare hash: Password and password hashed passed as parameter', async () => {
        const {sut,compareEncryptHashStub,authUserRepositoryStub} = makeSut()
        const hashedPassword = 'hashed_password'
       
        const compareEncryptSpy = vi.spyOn(compareEncryptHashStub,'compare')
        const data = {
            email: 'email@test',
            password:'password_test'
        }
        await sut.auth(data)
        expect(compareEncryptHashStub.compare).toBeCalledWith(data.password,hashedPassword)
    })

    test('Compare hash: Password and password hashed no match', async () => {
        const {sut,compareEncryptHashStub} = makeSut()

        vi.spyOn(compareEncryptHashStub,'compare').mockResolvedValueOnce(false)

        const data = {
            email: 'email@test',
            password:'password_test'
        }

        const response = await sut.auth(data)
        expect(response).toEqual({
            name:null,
            email:null,
            token:null
        })
    })

    test('Generate token: throw error', async () => {
        const {sut,compareEncryptHashStub,encodeToken} = makeSut()

        vi.spyOn(encodeToken,'encode').mockReturnValueOnce(new Promise((_,reject) => reject(new Error())))

        await expect(encodeToken.encode).rejects.toThrow()
    })

    test('Success auth and generate token: success', async () => {
        const {sut} = makeSut()
        const data = {
            email:'email@test',
            password:'password_test'
        }

        const response = await sut.auth(data)
        
        expect(response).toEqual({
            name:'name_test',
            email:'email@test',
            token:'encoded_token'
        })
    })
})