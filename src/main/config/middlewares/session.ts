import Session from 'express-session'

const SECRET_KEY = process.env?.SECRET_KEY.toString().trim()


export const session = Session({
    secret:SECRET_KEY
})