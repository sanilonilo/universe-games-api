import {Router} from 'express'
import {routeAdapter} from '../adapters'
import {signupFactory} from '../factories'

export default (router:Router) => {
    router.post('/signup',routeAdapter(signupFactory()))
}