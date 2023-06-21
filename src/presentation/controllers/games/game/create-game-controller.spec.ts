import {CreateGameController} from './'
import {CreateGameUseCase} from '../../../../domain/use-cases/games/game'
import { Game } from '../../../../domain/entities'
import { MissingParamError } from '../../../errors'

class CreateGameUseCaseStub implements CreateGameUseCase{
    async create(dto: Game):Promise<Game>{
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
    const createGameUseCaseStub = new CreateGameUseCaseStub()
    const sut = new CreateGameController(createGameUseCaseStub)
    return {
        sut,
        createGameUseCaseStub
    }
}

describe('CreateGameController', () => {
    test('Missing param name: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'',
                description:'description_test',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:null
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('name'))
    })

    test('Missing param description: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                description:'',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:null
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('description'))
    })

    test('Missing param image_url: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                description:'description_test',
                image_url:'',
                trailer_url:'trailer_test',
                category_id:null
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('image_url'))
    })

    test('Server error: return status 500', async () => {
        const {sut,createGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                name:'name_test',
                description:'description_test',
                image_url:'image_url',
                trailer_url:'trailer_test',
                category_id:null
            }
        }

        vi.spyOn(createGameUseCaseStub,'create').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toEqual('Server error')
    })
})