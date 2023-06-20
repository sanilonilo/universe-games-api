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

describe('Read category route', () => {

    test('Read success: return status 200', async () => {
        const {status} = await axios({
           url: getEndpoint('/game-category'),
           method:'get',
           data:{
            id:2
           },
           headers:{
            Authorization: `Bearer ${generateTokenStub()}`
           }
        })

        expect(status).toBe(200)
    })

})