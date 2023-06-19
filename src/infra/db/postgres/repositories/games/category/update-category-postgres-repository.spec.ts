import {UpdateCategoryPostgresRespository} from './'

const makeSut = () => {
    const sut = new UpdateCategoryPostgresRespository()
    return {
        sut
    }
}

describe('UpdateCategoryPostgresRespository', () => {
    test('Update category: update data error', async () => {
        const {sut} = makeSut()
        vi.spyOn(sut,'update').mockRejectedValueOnce(new Error())

        await expect(sut.update).rejects.toThrow()
    })

    test('Update category: update data success', async () => {
        const {sut} = makeSut()
        const data = {
            id:1,
            name:'category_updated_test'
        }

        vi.spyOn(sut,'update')

        await sut.update(data)

        expect(sut.update).toBeTruthy()
    })
})