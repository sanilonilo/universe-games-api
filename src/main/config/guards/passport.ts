import passport from 'passport'
import {ExtractJwt,Strategy,StrategyOptions} from 'passport-jwt'

const SECRET_KEY = process.env?.SECRET_KEY.toString().trim()

import {validateToken} from '../utils/validate-token'

export default () => {
    const options:StrategyOptions = {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(options, (payload,done) => {
                    if(!payload?.id || !validateToken(payload.exp)) {
                        done(null,false)
                        return
                    }
                    done(null,payload)
                })
    
    passport.use(strategy)
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))

    return {
        authenticate: () => passport.authenticate('jwt',{session:true})
    }
}