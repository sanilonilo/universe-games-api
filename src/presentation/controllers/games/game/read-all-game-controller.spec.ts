import {ReadAllGameController} from './'
import {ReadAllGameUseCase} from '../../../../domain/use-cases/games/game'
import { Game } from '../../../../domain/entities'

class ReadAllGameUseCaseStub implements ReadAllGameUseCase{
    async readAll(options:any):Promise<{data:Game[]}>{
        return new Promise(resolve => resolve({
            page:1,
            total:10,
            data:[{
                id:1,
                name:'name_test',
                description:'description_test',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:null
            } as Game]
        } as {data:Game[]}))
    }
}

const makeSut = () => {
    const readAllGameUseCaseStub = new ReadAllGameUseCaseStub()
    const sut = new ReadAllGameController(readAllGameUseCaseStub)
    return {
        sut,
        readAllGameUseCaseStub
    }
}

describe('ReadALlGameController', () => {
   
    test('Server error: return status 500', async () => {
        const {sut,readAllGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                page:1
            }
        }

        vi.spyOn(readAllGameUseCaseStub,'readAll').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toEqual('Server error')
    })

    test('Read all game: success return status 200', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                page:1
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(body).toEqual({
            page:1,
            total:10,
            data:[{
                id:1,
                name:'name_test',
                description:'description_test',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:null
            }]
        })
    })
})