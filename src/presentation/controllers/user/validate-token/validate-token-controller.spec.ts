import {ValidateTokenController} from './validate-token-controller'

describe('ValidateTokenController', () => {
    test('Request: success return status 200', async () => {
        const sut = new ValidateTokenController()
        const httpRequest = {
            body:{}
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(201)
        expect(body).toEqual({valid:true})
    })
})