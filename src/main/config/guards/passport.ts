import passport from 'passport'
import {ExtractJwt,Strategy,StrategyOptions} from 'passport-jwt'
import {SECRET_KEY} from '../../../../env'
import {validateToken} from '../utils/validate-token'

export default () => {
    const options:StrategyOptions = {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(options, (payload,done) => {
                    if(!payload.id) {
                        done(null,false)
                        return
                    }
                    done(null,validateToken(payload.exp))
                })
    
    passport.use(strategy)
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((_, done) => done(null, true))

    return {
        authenticate: () => passport.authenticate('jwt',{session:true})
    }
}