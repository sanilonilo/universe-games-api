import {SignupController} from './signup-controller'

describe('SigninController', () => {
    test('Missing param name',async () => {
        const sut = new SignupController()
        const body = {
            name:'name_test',
            email:'email@test',
            password:'password_test'
        }
        const response = sut.action()

        expect(response).toEqual(new Error())
    })
})