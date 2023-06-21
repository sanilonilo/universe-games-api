import {ReadGameController} from './'
import {ReadGameUseCase} from '../../../../domain/use-cases/games/game'
import { Game } from '../../../../domain/entities'
import { MissingParamError } from '../../../errors'

class ReadGameUseCaseStub implements ReadGameUseCase{
    async read(identifier:any):Promise<Game>{
        return new Promise(resolve => resolve({
            id:1,
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test',
            category_id:null
        } as Game))
    }
}

const makeSut = () => {
    const readGameUseCaseStub = new ReadGameUseCaseStub()
    const sut = new ReadGameController(readGameUseCaseStub)
    return {
        sut,
        readGameUseCaseStub
    }
}

describe('ReadGameController', () => {
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
        const {sut,readGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                id:1
            }
        }

        vi.spyOn(readGameUseCaseStub,'read').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toEqual('Server error')
    })

    test('Read game: success return status 200', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:1
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(body).toEqual({
            id:1,
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test',
            category_id:null
        })
    })
})