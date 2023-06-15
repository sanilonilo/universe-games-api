import {SigninController} from '../../../presentation/controllers/user/signin/signin-controller'
import {DbAuthUser} from '../../../data/use-cases/user'
import {BcryptAdapter} from '../../../infra/criptography/adapters'
import {JwtSimpleAdapter} from '../../../infra/token/adapters'
import {AuthUserPostgresRepository} from '../../../infra/db/postgres/repositories/user'


export const signinFactory = ():SigninController => {
    const bcryptAdapter = new BcryptAdapter()
    const authUserRepository = new AuthUserPostgresRepository()
    const encodeToken = new JwtSimpleAdapter()
    const authUserUseCase = new DbAuthUser(bcryptAdapter,authUserRepository,encodeToken)
    const signinController = new SigninController(authUserUseCase)
    return signinController
}