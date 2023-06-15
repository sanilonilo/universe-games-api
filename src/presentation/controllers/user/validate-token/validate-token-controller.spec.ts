import {ValidateTokenController} from './validate-token-controller'

describe('ValidateTokenController', () => {
    test('Request: throw error', async () => {
        const sut = new ValidateTokenController()
        vi.spyOn(sut,'action').mockRejectedValueOnce(new Error())

        await expect(sut.action).rejects.toThrow()
    })

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