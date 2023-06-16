import {CreateCategoryPostgresRepository} from './'

const makeSut = () => {
    const sut = new CreateCategoryPostgresRepository()

    return {
        sut
    }
}

describe('CreateCategoryPostgresRepository',() => {
    test('Create category: insert data error', async () => {
        const {sut} = makeSut()

        vi.spyOn(sut,'create').mockRejectedValueOnce(new Error())

        await expect(sut.create).rejects.toThrow()
    })

    test('Create category: insert data success', async () => {
        const {sut} = makeSut()
        const data = {
            name: 'category_test'
        }

        const categoryCreated = await sut.create(data)
        
        expect(!!categoryCreated.id).toBe(true)
        expect(categoryCreated.name).toBe(data.name)
    })
})