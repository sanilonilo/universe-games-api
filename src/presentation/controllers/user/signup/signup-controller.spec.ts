import {SignupController} from './signup-controller'
import {MissingParamError} from '../../../errors'

describe('SignupController', () => {
    test('Missing param name',async () => {
        const sut = new SignupController()
        const httpRequest = {
            body:{
                name:'',
                email:'email@test',
                password:'password_test'
            }
        }
        const {body,status} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('name'))
    })
})