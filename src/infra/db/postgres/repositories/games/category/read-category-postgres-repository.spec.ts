import {ReadCategoryPostgresRespository} from './'

const makeSut = () => {
    const sut = new ReadCategoryPostgresRespository()
    return {
        sut
    }
}

describe('ReadCategoryPostgresRespository', () => {
    test('Read category: read data error', async () => {
        const {sut} = makeSut()
        vi.spyOn(sut,'read').mockRejectedValueOnce(new Error())

        await expect(sut.read).rejects.toThrow()
    })

    test('Read category: read data success', async () => {
        const {sut} = makeSut()
        const identifier= {
            id:1
        }
          
        const category = await sut.read(identifier)

        expect(category.id).toBe(1)
    })
})