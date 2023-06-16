import {Router} from 'express'
import {routeAdapter} from '../adapters'
import {validateTokenFactory} from '../factories'
import RouteGuard from '../guards/passport'

export default (router:Router) => {
    router.route('/validate-token')
          .all(RouteGuard().authenticate())
          .get(routeAdapter(validateTokenFactory()))
}