import axios from 'axios'

const emaitGenerateFactory = () => `email${Math.random() * 10}@gmail.com`
const baseURL = 'http://localhost:3220/api'
const getEndpoint = (url:string) => `${baseURL}/${url}`

describe('Signup route', () => {
    test('Success signup', async () => {
        const { status} = await axios.post(getEndpoint('/signup'), {
            name: 'name_test_integration',
            email: emaitGenerateFactory(),
            password: 'password_test_integration',
            confirm_password: 'password_test_integration'
        })

        expect(status).toBe(200)
    })
})