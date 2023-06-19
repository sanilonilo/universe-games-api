import {CreateCategoryGameController} from './'
import {CreateCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import { Category } from '../../../../domain/entities'
import {MissingParamError} from '../../../errors'


class CreateCategoryGameUseCaseStub implements CreateCategoryGameUseCase{
    async create (dto: Category): Promise<Pick<Category, 'name'>>{
        return new Promise(resolve => resolve({name:'category_test',id:1} as Category))
    }
}

const makeSut = () => {
    const createCategoryGameUseCaseStub = new CreateCategoryGameUseCaseStub()
    const sut = new CreateCategoryGameController(createCategoryGameUseCaseStub)
    return {
        sut,
        createCategoryGameUseCaseStub
    }
}

describe('CreateCategoryGameController', async () => {
    test('Missing param name: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:''
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('name'))
    })

    test('Server error: return status 500', async () => {
        const {sut,createCategoryGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                name:'category_test'
            }
        }

        vi.spyOn(createCategoryGameUseCaseStub,'create').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toBe('Server error')
    })

    test('Created category: success return status 200', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                name:'category_test'
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(!!body.id).toBe(true)
        expect(body.name).toBe(httpRequest.body.name)
    })
})