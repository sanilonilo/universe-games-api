import {SignupController} from '../../../presentation/controllers/user/signup/signup-controller'
import {EmailValidatorAdapter} from '../../../presentation/adapters'
import {DbCreateUser} from '../../../data/use-cases/user'
import {BcryptAdapter} from '../../../infra/criptography/adapters'
import {CreateUserPostgresRepository} from '../../../infra/db/postgres/repositories/user'

export const signupFactory = ():SignupController => {
    const emailValidator = new EmailValidatorAdapter()
    const encrypter = new BcryptAdapter()
    const createUserRepository = new CreateUserPostgresRepository()
    const dbCreateUser = new DbCreateUser(encrypter,createUserRepository) 
    return new SignupController(emailValidator,dbCreateUser)
}