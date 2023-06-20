import {UpdateCategoryGameController} from './'
import {UpdateCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import { Category } from '../../../../domain/entities'
import {MissingParamError} from '../../../errors'


class UpdateCategoryGameUseCaseStub implements UpdateCategoryGameUseCase{
    async update (dto: Category): Promise<Category>{
        return new Promise(resolve => resolve({name:'category_updated_test',id:1} as Category))
    }
}

const makeSut = () => {
    const updateCategoryGameUseCaseStub = new UpdateCategoryGameUseCaseStub()
    const sut = new UpdateCategoryGameController(updateCategoryGameUseCaseStub)
    return {
        sut,
        updateCategoryGameUseCaseStub
    }
}

describe('UpdateCategoryGameController', async () => {
    test('Missing param id: bad request return status 400', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:null,
                name:'category_test'
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
                name:''
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(400)
        expect(body).toEqual(new MissingParamError('name'))
    })

    test('Server error: return status 500', async () => {
        const {sut,updateCategoryGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                id:1,
                name:'category_test'
            }
        }

        vi.spyOn(updateCategoryGameUseCaseStub,'update').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toBe('Server error')
    })

    test('Updated category: success return status 200', async () => {
        const {sut} = makeSut()
        const httpRequest = {
            body:{
                id:1,
                name:'category_test'
            }
        }

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(200)
        expect(body.id).toBe(1)
        expect(body.name).toBe('category_updated_test')
    })
})