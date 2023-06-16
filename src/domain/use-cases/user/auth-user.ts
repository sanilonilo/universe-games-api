import {User} from '../../entities'

export interface AuthUserUseCase{
    auth:(dto: Pick<User,'email' | 'password'>) => Promise<Pick<User,'name' | 'email'>>
}