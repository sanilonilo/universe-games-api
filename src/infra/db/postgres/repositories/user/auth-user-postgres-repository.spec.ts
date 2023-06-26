import {AuthUserPostgresRepository} from './'

const makeSut = () => {
    const sut = new AuthUserPostgresRepository()
    return {
        sut
    }
}

describe('AuthUserPostgresRepository',() => {
    test('Query: throw error', async () => {
        const {sut} = makeSut()

        vi.spyOn(sut,'auth').mockReturnValueOnce(new Promise((_,reject) => reject(new Error())))
       
        await expect(sut.auth).rejects.toThrow()
    })

    test('User not found: return null', async () => {
        const {sut} = makeSut()

        const data = {
            email:'email@test',
            password:'password_test'
        }

        const response = await sut.auth(data)
       
        expect(response).toBe(null)
    })

    test('User found: return userDB', async () => {
        const {sut} = makeSut()
        vi.spyOn(sut,'auth').mockResolvedValueOnce({
            id:1,
            email:'email@test',
            name:'name_test',
            password:'hashed_test',
            role:'client'
        })

        const data = {
            email:'email2.357355208548264@gmail.com',
            password:'password_test'
        }

        const userDB = await sut.auth(data)
       
        expect(userDB).toEqual({
            id:1,
            email:'email@test',
            name:'name_test',
            password:'hashed_test',
            role:'client'
        })
    })
})