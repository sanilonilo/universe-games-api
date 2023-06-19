import {DbDeleteCategoryGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class DeleteCategoryGameRepositoryStub implements GameRepository.Category.DeleteCategory{
    async delete(dto: GameDTO.DataEntry.Category.Delete): Promise<any>{
        return new Promise(resolve => resolve('o'))
    }
}

const makeSut = () => {
    const deleteCategoryGameRepositoryStub = new DeleteCategoryGameRepositoryStub()
    const sut = new DbDeleteCategoryGame(deleteCategoryGameRepositoryStub)
    return {
        sut,
        deleteCategoryGameRepositoryStub
    }
}

describe('DbDeleteCategoryGame', () => {
    test('Delete category repository: throw error', async () => {
        const {deleteCategoryGameRepositoryStub} = makeSut()

        vi.spyOn(deleteCategoryGameRepositoryStub,'delete').mockRejectedValueOnce(new Error())

        await expect(deleteCategoryGameRepositoryStub.delete).rejects.toThrow()
    })

    test('Delete category repository: success', async () => {
        const {sut} = makeSut()
        const identifier = 1
        const sutSpy = vi.spyOn(sut,'delete')
         
        await sut.delete(identifier)

        expect(sut.delete).toBeTruthy()

    })
})