import {DbCreateGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class CreateGameRepositoryStub implements GameRepository.Game.CreateGame{
    async create(dto: GameDTO.DataEntry.Game.Create): Promise<GameDTO.DataOutput.Game.Read>{
        return new Promise(resolve => resolve({
            id:1,
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test'
        }))
    }
}

const makeSut = () => {
    const createGameRepositoryStub = new CreateGameRepositoryStub()
    const sut = new DbCreateGame(createGameRepositoryStub)
    return {
        sut,
        createGameRepositoryStub
    }
}

describe('DbCreateGame', () => {
    test('Create game repository: throw error', async () => {
        const {createGameRepositoryStub} = makeSut()

        vi.spyOn(createGameRepositoryStub,'create').mockRejectedValueOnce(new Error())

        await expect(createGameRepositoryStub.create).rejects.toThrow()
    })

    test('Create game repository: success', async () => {
        const {sut} = makeSut()
        const data = {
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test'
        }
        
        const game = await sut.create(data)

        expect(game).toEqual({
            id:1,
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test'
        })
    })
})