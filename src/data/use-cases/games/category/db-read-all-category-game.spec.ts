import {DbReadAllCategoryGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class ReadAllCategoryGameRepositoryStub implements GameRepository.Category.ReadAllCategory{
    async readAll(): Promise<GameDTO.DataOutput.Category.Read[]>{
        return new Promise(resolve => resolve([{
            id:1,
            name:'category_test'
        }]))
    }
}

const makeSut = () => {
    const readAllCategoryGameRepositoryStub = new ReadAllCategoryGameRepositoryStub()
    const sut = new DbReadAllCategoryGame(readAllCategoryGameRepositoryStub)
    return {
        sut,
        readAllCategoryGameRepositoryStub
    }
}

describe('DbReadAllCategoryGame', () => {
    test('Read all category repository: throw error', async () => {
        const {readAllCategoryGameRepositoryStub} = makeSut()

        vi.spyOn(readAllCategoryGameRepositoryStub,'readAll').mockRejectedValueOnce(new Error())

        await expect(readAllCategoryGameRepositoryStub.readAll).rejects.toThrow()
    })

    test('Read all category repository: success', async () => {
        const {sut} = makeSut()
        
        const category = await sut.readAll()

        expect(category).toEqual([{
            id:1,
            name:'category_test'
        }])

    })
})