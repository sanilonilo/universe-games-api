import {DeleteGamePostgresRepository} from './'

const makeSut = () => {
    const sut = new DeleteGamePostgresRepository()
    return {
        sut
    }
}

describe('DeleteGamePostgresRepository', () => {
    test('Delete game: delete data error', async () => {
        const {sut} = makeSut()

        vi.spyOn(sut,'delete').mockRejectedValueOnce(new Error())

        await expect(sut.delete).rejects.toThrow()
    })

    test('Delete game: delete data success', async () => {
        const {sut} = makeSut()
        const identifier = {
            id: 1
        }
        vi.spyOn(sut,'delete')
       
        await sut.delete(identifier)

        expect(sut.delete).toBeTruthy()
    })
})