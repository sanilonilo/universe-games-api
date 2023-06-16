import {DbCreateUser} from '.'
import {Encrypter} from '../../protocols'
import {UserRepository} from '../../repositories'
import { UserDTO } from '../../DTOs'

class EncryptationStub implements Encrypter{
    async encrypter(value: string) {
        return new Promise<string>(resolve => resolve('hashed_password'))
    }
}

class CreateUserRepositoryStub implements UserRepository.CreateUser{
    async create(dto: UserDTO.DataEntry.Create){
        return new Promise<UserDTO.DataOutput.Read>(resolve => resolve({
            id: 1,
            name:'name_test',
            email:'email@test'
        }))
    }
}

const makeSut = () => {
    const createUserRepository = new CreateUserRepositoryStub()
    const encryptationStub = new EncryptationStub()
    const sut = new DbCreateUser(encryptationStub,createUserRepository)
    return {
        sut,
        encryptationStub,
        createUserRepository
    }
}

describe('DbCreateUser', () => {
    test('Encrypt: throw error', async () => {
        const {encryptationStub} = makeSut()

        vi.spyOn(encryptationStub,'encrypter').mockReturnValueOnce(new Promise<string>((_,reject) => reject(new Error())))

        await expect(encryptationStub.encrypter).rejects.toThrow()
    })

    test('Encryp: Password passed as parameter', async () => {
        const {sut,encryptationStub} = makeSut()
        const encryptSpy = vi.spyOn(encryptationStub,'encrypter')
        const data = {
            name:'name_test',
            email:'email@test',
            password:'password_test'
        }
        
        await sut.create(data)
        expect(encryptationStub.encrypter).toBeCalledWith(data.password)
    })

    test('Encryp: Password hashed', async () => {
        const {sut,encryptationStub} = makeSut()
        const encryptSpy = vi.spyOn(encryptationStub,'encrypter')
        const data = {
            name:'name_test',
            email:'email@test',
            password:'password_test'
        }
        
        await sut.create(data)
        expect(encryptationStub.encrypter).toReturnWith('hashed_password')
    })

    test('CreateUserRepository: success', async () => {
        const {sut} = makeSut()

        const data = {
            name:'name_test',
            email:'email@test',
            password:'password_test'
        }
        
        const response = await sut.create(data)
        expect(response).toEqual({
            id:1,
            name:'name_test',
            email:'email@test'
        })
    })
})