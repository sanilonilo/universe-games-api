import {DbCreateCategoryGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class CreateCategoryGameRepositoryStub implements GameRepository.Category.CreateCategory{
    async create(dto: GameDTO.DataEntry.Category.Create):Promise<GameDTO.DataOutput.Category.Read>{
        return new Promise(resolve => resolve({
            id:1,
            name:'category_test'
        }))
    }
}

const makeSut = () => {
    const createCategoryGameRepositoryStub = new CreateCategoryGameRepositoryStub()
    const sut = new DbCreateCategoryGame(createCategoryGameRepositoryStub)
    return {
        sut,
        createCategoryGameRepositoryStub
    }
}

describe('DbCreateCategoryGame',() => {
    test('CreateCategoryGameRepository: throw error', async () => {
        const {createCategoryGameRepositoryStub} = makeSut()

        vi.spyOn(createCategoryGameRepositoryStub,'create').mockRejectedValueOnce(new Error())

        await expect(createCategoryGameRepositoryStub.create).rejects.toThrow()
        
    })

    test('CreateCategoryGameRepository: success', async () => {
        const {sut} = makeSut()
        const data = {
            name:'category_test'
        }

        const response = await sut.create(data)
        
        expect(response).toEqual({
            id:1,
            name:data.name
        })
    })
})