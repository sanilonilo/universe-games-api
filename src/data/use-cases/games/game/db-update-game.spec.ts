import {DbUpdateGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class UpdateGameRepositoryStub implements GameRepository.Game.UpdateGame{
    async update(dto: GameDTO.DataEntry.Game.Update): Promise<GameDTO.DataOutput.Game.Read>{
        return new Promise(resolve => resolve({
            id:1,
            name:'name_updated_test',
            description:'description_updated_test',
            image_url:'image_updated_test',
            trailer_url:'trailer_updated_test',
            category_id:1
        }))
    }
}

const makeSut = () => {
    const updateGameRepositoryStub = new UpdateGameRepositoryStub()
    const sut = new DbUpdateGame(updateGameRepositoryStub)
    return {
        sut,
        updateGameRepositoryStub
    }
}

describe('DbUpdateGame', () => {
    test('Update game repository: throw error', async () => {
        const {updateGameRepositoryStub} = makeSut()

        vi.spyOn(updateGameRepositoryStub,'update').mockRejectedValueOnce(new Error())

        await expect(updateGameRepositoryStub.update).rejects.toThrow()
    })

    test('Update game repository: success', async () => {
        const {sut} = makeSut()
        const data = {
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test',
            category_id:1
        }
        
        const game = await sut.update(data)

        expect(game).toEqual({
            id:1,
            name:'name_updated_test',
            description:'description_updated_test',
            image_url:'image_updated_test',
            trailer_url:'trailer_updated_test',
            category_id:data.category_id
        })
    })
})