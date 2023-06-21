import {CreateGamePostgresRepository} from './'

const makeSut = () => {
    const sut = new CreateGamePostgresRepository()
    return {
        sut
    }
}

describe('CreateGamePostgresRepository', () => {
    test('Create game: insert data error', async () => {
        const {sut} = makeSut()

        vi.spyOn(sut,'create').mockRejectedValueOnce(new Error())

        await expect(sut.create).rejects.toThrow()
    })

    test('Create game: insert data success', async () => {
        const {sut} = makeSut()
        const data = {
            name:'name_test',
            description:'description_test',
            image_url:'image_test',
            trailer_url:'trailer_test',
            category_id: null
        }

        const game = await sut.create(data)

        expect(!!game.id).toBe(true)
        expect(game.name).toBe(data.name)
        expect(game.description).toBe(data.description)
        expect(game.image_url).toBe(data.image_url)
        expect(game.trailer_url).toBe(data.trailer_url)
        expect(game.category_id).toBe(data.category_id)
    })
})