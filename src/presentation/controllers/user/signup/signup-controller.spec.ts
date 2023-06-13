import {SignupController} from './signup-controller'
import {MissingParamError,InvalidParamError} from '../../../errors'
import {EmailValidator} from '../../../protocols'

class EmailValidatorFake implements EmailValidator{
    isValid(email: string){
        return true
    }
}

const makeSut = () => {
    const emailValidator = new EmailValidatorFake()
    const sut = new SignupController(emailValidator)

    return {
        sut,
        emailValidator
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
})