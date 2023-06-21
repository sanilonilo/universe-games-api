import {DbReadGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class ReadGameRepositoryStub implements GameRepository.Game.ReadGame{
    async read(identifier:any): Promise<GameDTO.DataOutput.Game.Read>{
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
    const readGameRepositoryStub = new ReadGameRepositoryStub()
    const sut = new DbReadGame(readGameRepositoryStub)
    return {
        sut,
        readGameRepositoryStub
    }
}

describe('DbReadGame', () => {
    test('Read game repository: throw error', async () => {
        const {readGameRepositoryStub} = makeSut()

        vi.spyOn(readGameRepositoryStub,'read').mockRejectedValueOnce(new Error())

        await expect(readGameRepositoryStub.read).rejects.toThrow()
    })

    test('Read game repository: success', async () => {
        const {sut} = makeSut()
        const identifier = {
            id:1
        }
        const game = await sut.read(identifier)

        expect(game).toEqual({
            id:identifier.id,
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test'
        })
    })
})