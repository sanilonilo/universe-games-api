import {CreateUserPostgresRepository} from './'

const emaitGenerateFactory = () => `email${Math.random() * 10}@test`

const makeSut = () => {
    const sut = new CreateUserPostgresRepository()
    return {
        sut
    }
}

describe('CreateUserPostgresRepository',() => {
    test('Create user: insert data error', async () => {
        const {sut} = makeSut()
        vi.spyOn(sut,'create').mockReturnValueOnce(new Promise((_,reject) => reject(new Error())))

        await expect(sut.create).rejects.toThrow()
    })

    test('Create user: insert data success', async () => {
        const {sut} = makeSut()
        const data = {
            name: 'name_test',
            email:emaitGenerateFactory(),
            password:'hashed_password_test'
        }

        const userCreated = await sut.create(data)

        expect(!!userCreated.id).toBe(true)
        expect(userCreated.name).toBe(data.name)
        expect(userCreated.email).toBe(data.email)
    })
})