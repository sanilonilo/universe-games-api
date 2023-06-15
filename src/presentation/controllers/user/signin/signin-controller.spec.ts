import {MissingParamError} from '../../../errors'
import {SigninController} from './signin-controller'
import {AuthUserUseCase} from '../../../../domain/use-cases/user'
import { UserDTO } from '../../../../domain/use-cases/DTOs'

class AuthUserUseCaseStub implements AuthUserUseCase{
    async auth(dto: UserDTO.DataEntry.Auth):Promise<UserDTO.DataOutput.Authenticated>{
        return new Promise(resolve => resolve({
            name:'name_test',
            email:'email@test',
            token:'encoded_token'
        }))
    }
}

const makeSut = () => {
    const authUserUseCaseStub = new AuthUserUseCaseStub()
    const sut = new SigninController(authUserUseCaseStub)
    return {
        sut,
        authUserUseCaseStub
    }
}

describe('SigninController', () => {
    test('Missing param email: bad request status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                email:'',
                password:'password_test'
            }
        }

        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('email'))
    })

    test('Missing param password: bad request status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                email:'email@test',
                password:''
            }
        }

        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('password'))
    })

    test('Error server: bad request status 500', async () => {
        const {sut,authUserUseCaseStub} = makeSut()
        vi.spyOn(authUserUseCaseStub,'auth').mockReturnValueOnce(new Promise((_,reject) => reject(new Error())))
        
        const httpRequest = {
            body:{
                email:'email@test',
                password:'password_test'
            }
        }

        const {body,status} = await sut.action(httpRequest)
        
        expect(status).toBe(500)
        expect(body).toBe('Server error')
    })

    test('User autheticated: success status 200', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                email:'email@test',
                password:'password_test'
            }
        }

        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(body).toEqual({
            name:'name_test',
            email:'email@test',
            token:'encoded_token'
        })
    })
})