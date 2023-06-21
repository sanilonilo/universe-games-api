import {ReadGamePostgresRepository} from './'

const makeSut = () => {
    const sut = new ReadGamePostgresRepository()
    return {
        sut
    }
}

describe('ReadGamePostgresRepository', () => {
    test('Read game: read data error', async () => {
        const {sut} = makeSut()

        vi.spyOn(sut,'read').mockRejectedValueOnce(new Error())

        await expect(sut.read).rejects.toThrow()
    })

    test('Read game: read data success', async () => {
        const {sut} = makeSut()
        const identifier = {
            id: 1
        }
        vi.spyOn(sut,'read')
       
        await sut.read(identifier)

        expect(sut.read).toBeTruthy()
    })
})