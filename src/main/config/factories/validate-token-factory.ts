import {ValidateTokenController} from '../../../presentation/controllers/user/validate-token/validate-token-controller'

export const validateTokenFactory = ():ValidateTokenController => {
    return new ValidateTokenController()
}