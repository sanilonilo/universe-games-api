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

describe('Update category route', () => {

    test('Update success: return status 200', async () => {
        const {status} = await axios.put(getEndpoint('/game-category'),{
            id:2,
            name:'category_updated_test_integration'
        },{
            headers:{
                Authorization: `Bearer ${generateTokenStub()}`
            }
        })

        expect(status).toBe(200)
    })

})