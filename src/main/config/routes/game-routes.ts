import {Router} from 'express'
import {routeAdapter} from '../adapters'
import {
    createGameFactory,
    readGameFactory,
    readAllGameFactory,
    updateGameFactory,
    deleteGameFactory
} from '../factories'
import RouteGuard from '../guards/passport'
import AdminGuard from '../guards/admin'

export default (router:Router) => {
    router.route('/game')
          .all(RouteGuard().authenticate())
          .get(routeAdapter(readGameFactory()))
          .post(AdminGuard(routeAdapter(createGameFactory())))
          .put(AdminGuard(routeAdapter(updateGameFactory())))
          .delete(AdminGuard(routeAdapter(deleteGameFactory())))

    router.route('/game/all')
          .all(RouteGuard().authenticate())
          .get(routeAdapter(readAllGameFactory()))    
}