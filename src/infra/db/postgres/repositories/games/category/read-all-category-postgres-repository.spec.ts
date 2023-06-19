import {ReadAllCategoryPostgresRespository} from './'

const makeSut = () => {
    const sut = new ReadAllCategoryPostgresRespository()
    return {
        sut
    }
}

describe('ReadAllCategoryPostgresRespository', () => {
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