import {ReadAllCategoryGameController} from './'
import {ReadAllCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import { Category } from '../../../../domain/entities'


class ReadAllCategoryGameUseCaseStub implements ReadAllCategoryGameUseCase{
    async readAll (): Promise<Category[]>{
        return new Promise(resolve => resolve([{name:'category_test',id:1} as Category]))
    }
}

const makeSut = () => {
    const readAllCategoryGameUseCaseStub = new ReadAllCategoryGameUseCaseStub()
    const sut = new ReadAllCategoryGameController(readAllCategoryGameUseCaseStub)
    return {
        sut,
        readAllCategoryGameUseCaseStub
    }
}

describe('ReadAllCategoryGameController', async () => {

    test('Server error: return status 500', async () => {
        const {sut,readAllCategoryGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{}
        }

        vi.spyOn(readAllCategoryGameUseCaseStub,'readAll').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toBe('Server error')
    })

    test('Read all categories: success return status 200', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{}
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(body).toEqual([{
            id:1,
            name:'category_test'
        }])
    })
})