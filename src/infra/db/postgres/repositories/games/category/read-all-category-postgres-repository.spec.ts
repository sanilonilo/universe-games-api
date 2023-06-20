import {ReadAllCategoryPostgresRepository} from './'

const makeSut = () => {
    const sut = new ReadAllCategoryPostgresRepository()
    return {
        sut
    }
}

describe('ReadAllCategoryPostgresRepository', () => {
    test('Read all category: read all data error', async () => {
        const {sut} = makeSut()
        vi.spyOn(sut,'readAll').mockRejectedValueOnce(new Error())

        await expect(sut.readAll).rejects.toThrow()
    })

    test('Read all category: read all data success', async () => {
        const {sut} = makeSut()
        
        const categories = await sut.readAll()

        expect(Array.isArray(categories)).toBe(true)
    })
})