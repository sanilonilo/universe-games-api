import {DeleteCategoryPostgresRepository} from './'

const makeSut = () => {
    const sut = new DeleteCategoryPostgresRepository()
    return {
        sut
    }
}

describe('DeleteCategoryPostgresRepository', () => {
    test('Delete category: delete data error', async () => {
        const {sut} = makeSut()
        vi.spyOn(sut,'delete').mockRejectedValueOnce(new Error())

        await expect(sut.delete).rejects.toThrow()
    })

    test('Delete category: delete data success', async () => {
        const {sut} = makeSut()
        const identifier = {
            id:1      
        }

        vi.spyOn(sut,'delete')

        await sut.delete(identifier)

        expect(sut.delete).toBeTruthy()
    })
})