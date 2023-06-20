import {ReadCategoryPostgresRepository} from './'

const makeSut = () => {
    const sut = new ReadCategoryPostgresRepository()
    return {
        sut
    }
}

describe('ReadCategoryPostgresRepository', () => {
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

        vi.spyOn(sut,'read')
          
        await sut.read(identifier)

        expect(sut.read).toBeTruthy()
    })
})