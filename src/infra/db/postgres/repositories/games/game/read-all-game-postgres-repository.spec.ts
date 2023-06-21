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

    test('Read all game no page param: read all data success', async () => {
        const {sut} = makeSut()
        const options = {
            page: null
        }
       
        const response = await sut.readAll(options)

        expect(Array.isArray(response.data)).toBe(true)
        expect(response.page).toBe(1)
        expect(!!response.total || response.total == 0).toBe(true)
    })

    test('Read all game: read all data success', async () => {
        const {sut} = makeSut()
        const options = {
            page: 1
        }
       
        const response = await sut.readAll(options)

        expect(Array.isArray(response.data)).toBe(true)
        expect(response.page).toBe(options.page)
        expect(!!response.total || response.total == 0).toBe(true)
    })
})