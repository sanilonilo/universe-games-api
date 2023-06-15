import passport from 'passport'
import {ExtractJwt,Strategy,StrategyOptions} from 'passport-jwt'
import {SECRET_KEY} from '../../../../env'

export default () => {
    const options:StrategyOptions = {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const stratrgy = new Strategy(options, 
                (payload,done) => payload.id ? done(null,payload) : done(null,false))
    
    passport.use(stratrgy)

    return {
        authenticate: () => passport.authenticate('jwt',{session:true})
    }
}