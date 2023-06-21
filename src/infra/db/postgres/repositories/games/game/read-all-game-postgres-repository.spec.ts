import {ReadAllGamePostgresRepository} from './'

const makeSut = () => {
    const sut = new ReadAllGamePostgresRepository()
    return {
        sut
    }
}

describe('ReadAllGamePostgresRepository', () => {
    test('Read all game: read all data error', async () => {
        const {sut} = makeSut()

        vi.spyOn(sut,'readAll').mockRejectedValueOnce(new Error())

        await expect(sut.readAll).rejects.toThrow()
    })

    test('Read all game: read all data success', async () => {
        const {sut} = makeSut()
        const options = {
            page: 1
        }
       
        const response = await sut.readAll(options)

        expect(Array.isArray(response.data)).toBe(true)
        expect(response.page).toBe(options.page)
    })
})