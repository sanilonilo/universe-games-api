import {EmailValidator} from '../protocols'
import validator from 'email-validator'

export class EmailValidatorAdapter implements EmailValidator{
    isValid(email: string){
        return validator.validate(email)
    }
}