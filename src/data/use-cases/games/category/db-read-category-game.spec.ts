import {DbReadCategoryGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class ReadCategoryGameRepositoryStub implements GameRepository.Category.ReadCategory{
    async read(dto: GameDTO.DataEntry.Category.Read): Promise<GameDTO.DataOutput.Category.Read>{
        return new Promise(resolve => resolve({
            id:1,
            name:'category_test'
        }))
    }
}

const makeSut = () => {
    const readCategoryGameRepositoryStub = new ReadCategoryGameRepositoryStub()
    const sut = new DbReadCategoryGame(readCategoryGameRepositoryStub)
    return {
        sut,
        readCategoryGameRepositoryStub
    }
}

describe('DbReadCategoryGame', () => {
    test('Read category repository: throw error', async () => {
        const {readCategoryGameRepositoryStub} = makeSut()

        vi.spyOn(readCategoryGameRepositoryStub,'read').mockRejectedValueOnce(new Error())

        await expect(readCategoryGameRepositoryStub.read).rejects.toThrow()
    })

    test('Read category repository: success', async () => {
        const {sut} = makeSut()
        const identifier = 1

        const category = await sut.read(identifier)

        expect(category).toEqual({
            id:1,
            name:'category_test'
        })

    })
})