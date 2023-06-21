import axios from 'axios'
import jwt from 'jwt-simple'
import {SECRET_KEY} from '../../../../env'

const baseURL = 'http://localhost:3220/api'
const getEndpoint = (url: string) => `${baseURL}/${url}`

const generateTokenStub = () => {
    const now = Math.floor(Date.now() / 1000)

    const payload = {
        id: 1,
        name: 'name_test',
        email: 'email@test',
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
        expect(!!data.total).toBe(true)
        expect(Array.isArray(data.data)).toBe(true)
    })

})