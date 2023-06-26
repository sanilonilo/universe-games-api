import axios from 'axios'

const emaitGenerateFactory = () => `email${Math.random() * 10}@gmail.com`
const baseURL = `http://localhost:${process.env.PORT || 3333}/api`
const getEndpoint = (url:string) => `${baseURL}/${url}`

describe('Signin route', () => {
    test('User not found: return status 200 and body null', async () => {
        const { data,status} = await axios.post(getEndpoint('/signin'), {
            email: emaitGenerateFactory(),
            password: 'password_test_integration'
        })

        expect(!!data).toBe(false)
        expect(status).toBe(200)
    })

    test('Incorrect password: return status 200 no data', async () => {
        vi.spyOn(axios,'post').mockResolvedValueOnce({status:200,data:{name:null,email:null,token:null}})
        
        const { data,status} = await axios.post(getEndpoint('/signin'), {
            email: emaitGenerateFactory(),
            password: 'password_test_integration'
        })

        expect(data).toEqual({
            name:null,
            email:null,
            token:null
        })

        expect(status).toBe(200)
    })

    test('Signin success: return status 200 and token', async () => {
        vi.spyOn(axios,'post').mockResolvedValueOnce({status:200,data:{name:'name_test',email:'email@test',token:'encoded_token'}})
        
        const { data,status} = await axios.post(getEndpoint('/signin'), {
            email: emaitGenerateFactory(),
            password: 'password_test_integration'
        })

        expect(!!data.token).toBe(true)
        expect(status).toBe(200)
    })

})