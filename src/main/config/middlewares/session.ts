import Session from 'express-session'
import {SECRET_KEY} from '../../../../env'

export const session = Session({
    secret:SECRET_KEY
})