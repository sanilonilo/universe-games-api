import {ReadCategoryGameController} from './'
import {ReadCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import { Category } from '../../../../domain/entities'
import {MissingParamError} from '../../../errors'


class ReadCategoryGameUseCaseStub implements ReadCategoryGameUseCase{
    async read (identifier:any): Promise<Category>{
        return new Promise(resolve => resolve({name:'category_test',id:1} as Category))
    }
}

const makeSut = () => {
    const readCategoryGameUseCaseStub = new ReadCategoryGameUseCaseStub()
    const sut = new ReadCategoryGameController(readCategoryGameUseCaseStub)
    return {
        sut,
        readCategoryGameUseCaseStub
    }
}

describe('ReadCategoryGameController', async () => {
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
        const {sut,readCategoryGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                id:1
            }
        }

        vi.spyOn(readCategoryGameUseCaseStub,'read').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toBe('Server error')
    })

    test('Read category: success return status 200', async () => {
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
            name:'category_test'
        })
    })
})