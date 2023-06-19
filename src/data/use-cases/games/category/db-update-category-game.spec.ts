import {DbUpdateCategoryGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class UpdateCategoryGameRepositoryStub implements GameRepository.Category.UpdateCategory{
    async update(dto: GameDTO.DataEntry.Category.Update): Promise<GameDTO.DataOutput.Category.Read>{
        return new Promise(resolve => resolve({
            id:1,
            name:'category_updated_test'
        }))
    }
}

const makeSut = () => {
    const updateCategoryGameRepositoryStub = new UpdateCategoryGameRepositoryStub()
    const sut = new DbUpdateCategoryGame(updateCategoryGameRepositoryStub)
    return {
        sut,
        updateCategoryGameRepositoryStub
    }
}

describe('DbUpdateCategoryGame', () => {
    test('Update category repository: throw error', async () => {
        const {updateCategoryGameRepositoryStub} = makeSut()

        vi.spyOn(updateCategoryGameRepositoryStub,'update').mockRejectedValueOnce(new Error())

        await expect(updateCategoryGameRepositoryStub.update).rejects.toThrow()
    })

    test('Update category repository: success', async () => {
        const {sut} = makeSut()
        const data = {
            id:1,
            name: 'category_update_test'
        }

        const categoryUpdated = await sut.update(data)

        expect(categoryUpdated).toEqual({
            id:1,
            name:'category_updated_test'
        })

    })
})