import axios from 'axios'
import jwt from 'jwt-simple'

const SECRET_KEY = process.env?.SECRET_KEY.toString().trim()


const baseURL = `http://localhost:${process.env.PORT || 3333}/api`
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