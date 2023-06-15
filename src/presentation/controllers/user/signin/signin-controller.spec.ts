import {MissingParamError} from '../../../errors'
import {SigninController} from './signin-controller'

describe('SigninController', () => {
    test('Missing param email: bad request status 400', async () => {
        const sut = new SigninController()
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
        const sut = new SigninController()
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
})