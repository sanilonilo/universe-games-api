import {DbSignup} from './'
import {Encrypter} from '../../protocols'

class EncryptationStub implements Encrypter{
    async encrypter(value: string) {
        return new Promise<string>(resolve => resolve('hashed_password'))
    }
}

const makeSut = () => {
    const encryptationStub = new EncryptationStub()
    const sut = new DbSignup(encryptationStub)
    return {
        sut,
        encryptationStub
    }
}

describe('DbSignup', () => {
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
})