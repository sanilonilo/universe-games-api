import {UpdateGameController} from './'
import {UpdateGameUseCase} from '../../../../domain/use-cases/games/game'
import { Game } from '../../../../domain/entities'
import { MissingParamError } from '../../../errors'

class UpdateGameUseCaseStub implements UpdateGameUseCase{
    async update(dto: Game):Promise<Game>{
        return new Promise(resolve => resolve({
            id:1,
            name:'name_updated_test',
            description:'description_updated_test',
            image_url:'image_updated_test',
            trailer_url:'trailer_updated_test',
            category_id:null
        } as Game))
    }
}

const makeSut = () => {
    const updateGameUseCaseStub = new UpdateGameUseCaseStub()
    const sut = new UpdateGameController(updateGameUseCaseStub)
    return {
        sut,
        updateGameUseCaseStub
    }
}

describe('UpdateGameController', () => {

    test('Missing param id: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:null,
                name:'name_test',
                description:'description_test',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:null
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('id'))
    })

    test('Missing param name: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:1,
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
                id:1,
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
                id:1,
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
        const {sut,updateGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                id:1,
                name:'name_test',
                description:'description_test',
                image_url:'image_url',
                trailer_url:'trailer_test',
                category_id:null
            }
        }

        vi.spyOn(updateGameUseCaseStub,'update').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toEqual('Server error')
    })

    test('Update game: success return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:1,
                name:'name_test',
                description:'description_test',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:null
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(body).toEqual({
            id:1,
            name:'name_updated_test',
            description:'description_updated_test',
            image_url:'image_updated_test',
            trailer_url:'trailer_updated_test',
            category_id:null
        })
    })
})