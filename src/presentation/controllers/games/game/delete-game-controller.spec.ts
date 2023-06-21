import {DeleteGameController} from './'
import {DeleteGameUseCase} from '../../../../domain/use-cases/games/game'
import { MissingParamError } from '../../../errors'

class DeleteGameUseCaseStub implements DeleteGameUseCase{
    async delete(identifier:any):Promise<any>{
        return new Promise<void>(resolve => resolve())
    }
}

const makeSut = () => {
    const deleteGameUseCaseStub = new DeleteGameUseCaseStub()
    const sut = new DeleteGameController(deleteGameUseCaseStub)
    return {
        sut,
        deleteGameUseCaseStub
    }
}

describe('DeleteGameController', () => {
    test('Missing param id: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:null
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('id'))
    })

    

    test('Server error: return status 500', async () => {
        const {sut,deleteGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                id:1
            }
        }

        vi.spyOn(deleteGameUseCaseStub,'delete').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toEqual('Server error')
    })

    test('Delete game: success return status 200', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:1
            }
        }

        const {status} = await sut.action(httpRequest)

        expect(status).toBe(200)
    })
})