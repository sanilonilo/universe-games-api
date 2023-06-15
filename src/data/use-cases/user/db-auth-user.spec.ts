import {CompareEncryptHash} from '../../protocols'
import {DbAuthUser} from './'
import {UserRepository} from '../../repositories'
import { UserDTO } from '../../../domain/use-cases/DTOs'

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
            email:'email_test',
            password:'password_test'
        }))
    }   
}

const makeSut = () => {
    const compareEncryptHashStub = new CompareEncryptHashStub()
    const authUserRepositoryStub = new AuthUserRepositoryStub()
    const sut = new DbAuthUser(compareEncryptHashStub,authUserRepositoryStub)
    return {
        sut,
        compareEncryptHashStub,
        authUserRepositoryStub
    }
}

describe('DbAuthUser',() => {
    test('Compare hash: throw error', async () => {
        const {sut,compareEncryptHashStub} = makeSut()
        vi.spyOn(compareEncryptHashStub,'compare').mockReturnValueOnce(new Promise((_,reject) => reject(new Error())))

        await expect(compareEncryptHashStub.compare).rejects.toThrow()
    })

    test('Compare hash: Password and password confirmation passed as parameter', async () => {
        const {sut,compareEncryptHashStub,authUserRepositoryStub} = makeSut()
        const hashedPassword = 'hashed_password'
       
        vi.spyOn(authUserRepositoryStub,'auth').mockReturnValueOnce(new Promise(resolve => resolve({
            id:1,
            name:'name_test',
            email:'email@test',
            password:hashedPassword
        })))

        const compareEncryptSpy = vi.spyOn(compareEncryptHashStub,'compare')
        const data = {
            email: 'email@test',
            password:'password_test'
        }
        await sut.auth(data)
        expect(compareEncryptHashStub.compare).toBeCalledWith(data.password,hashedPassword)
    })
})