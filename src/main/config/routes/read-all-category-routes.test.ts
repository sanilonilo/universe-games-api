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

describe('Read all category route', () => {

    test('Read all success: return status 200', async () => {
        const {status,data} = await axios.get(getEndpoint('/game-category/all'),{
            headers:{
                Authorization: `Bearer ${generateTokenStub()}`
            }
        })

        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })

})