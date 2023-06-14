import app from '../app'
import request from 'supertest'

describe('Signup route',() => {
    test('Success signup', async () => {
        await request(app)
                .post('/api/signup')
                .send({
                    name: 'name_test_integration',
                    email:'email@test.integration',
                    password: 'password_test_integration',
                    confirm_password: 'password_test_integration'
                })
                .expect(200)
    })
})