import {UpdateGamePostgresRepository} from './'

const makeSut = () => {
    const sut = new UpdateGamePostgresRepository()
    return {
        sut
    }
}

describe('UpdateGamePostgresRepository', () => {
    test('Update game: update data error', async () => {
        const {sut} = makeSut()

        vi.spyOn(sut,'update').mockRejectedValueOnce(new Error())

        await expect(sut.update).rejects.toThrow()
    })

    test('Update game: update data success', async () => {
        const {sut} = makeSut()
        const data = {
            id:4,
            name:'name_updated_test',
            description:'description_updated_test',
            image_url:'image_updated_test',
            trailer_url:'trailer_updated_test',
            category_id: null
        }

        vi.spyOn(sut,'update')

        await sut.update(data)

        expect(sut.update).toBeTruthy()
    })
})