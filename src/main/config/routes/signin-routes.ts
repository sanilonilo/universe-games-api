import {Router} from 'express'
import {routeAdapter} from '../adapters'
import {signinFactory} from '../factories'

export default (router:Router) => {
    router.post('/signin',routeAdapter(signinFactory()))
}