import axios from 'axios'
import jwt from 'jwt-simple'

const SECRET_KEY = process.env?.SECRET_KEY.toString().trim()


const baseURL = 'http://localhost:3220/api'
const getEndpoint = (url: string) => `${baseURL}/${url}`

const generateTokenStub = () => {
    const now = Math.floor(Date.now() / 1000)

    const payload = {
        id: 1,
        name: 'name_test_seed',
        email: 'email@test.seed',
        admin:true,
        iat: now,
        exp: now + (60 * 60 * 24)
    }

    return jwt.encode(payload,SECRET_KEY)

}

describe('Read all game route', () => {

    test('Read all success: return status 200', async () => {
        const page = 1
        const { status,data } = await axios({
            url:getEndpoint('/game/all'),
            method:'get',
            data:{page},
            headers:{
                Authorization: `Bearer ${generateTokenStub()}`
            }
        })
       
        expect(status).toBe(200)
        expect(data.page).toBe(page)
        expect(!!data.total || data.total == 0 ).toBe(true)
        expect(Array.isArray(data.data)).toBe(true)
    })

})