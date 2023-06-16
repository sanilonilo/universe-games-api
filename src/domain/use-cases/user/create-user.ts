import {User} from '../../entities'

export interface CreateUserUseCase{
    create:(dto: User) => Promise<Pick<User,'name' | 'email'>>
}