import {SignupController} from './signup-controller'
import {MissingParamError,InvalidParamError} from '../../../errors'
import {EmailValidator} from '../../../protocols'
import {CreateUserUseCase} from '../../../../domain/use-cases/user'
import { UserDTO } from '../../../../data/DTOs'

class CreateUserUseCaseFake implements CreateUserUseCase{
    async create(dto: UserDTO.DataEntry.Create):Promise<UserDTO.DataOutput.Read>{
        return new Promise<UserDTO.DataOutput.Read>(resolve => resolve({
            id:1,
            name:'name_test',
            email:'email@test'
        }))
    }
}

class EmailValidatorFake implements EmailValidator{
    isValid(email: string){
        return true
    }
}

const makeSut = () => {
    const createUserUseCase = new CreateUserUseCaseFake()
    const emailValidator = new EmailValidatorFake()
    const sut = new SignupController(emailValidator,createUserUseCase)

    return {
        sut,
        emailValidator,
        createUserUseCase
    }
}

describe('SignupController', () => {
    test('Missing param name: bad request status 400',async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'',
                email:'email@test',
                password:'password_test',
                confirm_password: 'confirm_test'
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('name'))
    })

    test('Missing param email: bad request status 400',async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                email:'',
                password:'password_test',
                confirm_password: 'confirm_test'
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('email'))
    })

    test('Missing param password: bad request status 400',async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                email:'email@test',
                password:'',
                confirm_password: 'confirm_test'
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('password'))
    })

    test('Missing param confirm_password: bad request status 400',async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                email:'email@test',
                password:'password_test',
                confirm_password: ''
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('confirm_password'))
    })

    test('Params password and confirm_password no confer: bad request status 400',async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                email:'email@test',
                password:'password_test',
                confirm_password: 'password_test_incorrect'
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new Error('Password and password confirmation do not confer'))
    })

    test('Invalid param email: bad request status 400',async () => {
        const {sut,emailValidator} = makeSut()
        vi.spyOn(emailValidator,'isValid').mockReturnValueOnce(false)
        const httpRequest = {
            body:{
                name:'name_test',
                email:'email@test',
                password:'password_test',
                confirm_password: 'password_test'
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new InvalidParamError('email'))
    })

    test('Error server: bad request status 500',async () => {
        const {sut,createUserUseCase} = makeSut()
        vi.spyOn(createUserUseCase,'create').mockReturnValueOnce(new Promise((_,reject) => reject(new Error())))
        
        const httpRequest = {
            body:{
                name:'name_test',
                email:'email@test',
                password:'password_test',
                confirm_password: 'password_test'
            }
        }

        const {body,status} = await sut.action(httpRequest)
        
        expect(status).toBe(500)
        expect(body).toBe('Server error')
    })

    test('Created user: success status 200',async () => {
        const {sut,emailValidator} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                email:'email@test',
                password:'password_test',
                confirm_password: 'password_test'
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(body).toEqual({
            id:1,
            name:'name_test',
            email:'email@test'
        })
    })
})