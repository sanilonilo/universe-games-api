import {DeleteCategoryGameController} from './'
import {DeleteCategoryGameUseCase} from '../../../../domain/use-cases/games/category'
import {MissingParamError} from '../../../errors'


class DeleteCategoryGameUseCaseStub implements DeleteCategoryGameUseCase{
    async delete (identifier:any): Promise<any>{
        return new Promise<void>(resolve => resolve())
    }
}

const makeSut = () => {
    const deleteCategoryGameUseCaseStub = new DeleteCategoryGameUseCaseStub()
    const sut = new DeleteCategoryGameController(deleteCategoryGameUseCaseStub)
    return {
        sut,
        deleteCategoryGameUseCaseStub
    }
}

describe('DeleteCategoryGameController', async () => {
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
        const {sut,deleteCategoryGameUseCaseStub} = makeSut()
        const httpRequest = {
            body:{
                id:1
            }
        }

        vi.spyOn(deleteCategoryGameUseCaseStub,'delete').mockRejectedValueOnce(new Error())

        const {status,body} = await sut.action(httpRequest)

        expect(status).toBe(500)
        expect(body).toBe('Server error')
    })

    test('Delete category: success return status 200', async () => {
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