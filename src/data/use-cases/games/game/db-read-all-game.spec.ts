import {DbReadAllGame} from './'
import {GameRepository} from '../../../repositories'
import { GameDTO } from '../../../DTOs'

class ReadAllGameRepositoryStub implements GameRepository.Game.ReadAllGame{
    async readAll(dto:GameDTO.DataEntry.Game.ReadAll): Promise<GameDTO.DataOutput.Game.ReadAll>{
        return new Promise(resolve => resolve({
            page:1,
            total:10,
            data:[{
                id:1,
                name:'name_test',
                description:'description_test',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:1
            }]
        }))
    }
}

const makeSut = () => {
    const readAllGameRepositoryStub = new ReadAllGameRepositoryStub()
    const sut = new DbReadAllGame(readAllGameRepositoryStub)
    return {
        sut,
        readAllGameRepositoryStub
    }
}

describe('DbReadAllGame', () => {
    test('Read all game repository: throw error', async () => {
        const {readAllGameRepositoryStub} = makeSut()

        vi.spyOn(readAllGameRepositoryStub,'readAll').mockRejectedValueOnce(new Error())

        await expect(readAllGameRepositoryStub.readAll).rejects.toThrow()
    })

    test('Read game all repository: success', async () => {
        const {sut} = makeSut()
        const options = {
            page:1
        }
        const games = await sut.readAll(options)

        expect(games).toEqual({
            page:options.page,
            total:10,
            data:[{
                id:1,
                name:'name_test',
                description:'description_test',
                image_url:'image_test',
                trailer_url:'trailer_test',
                category_id:1
            }]
        })
    })
})