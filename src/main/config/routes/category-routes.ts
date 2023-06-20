import {Router} from 'express'
import {routeAdapter} from '../adapters'
import {
    createCategoryFactory,
    readCategoryFactory,
    readAllCategoryFactory,
    updateCategoryFactory,
    deleteCategoryFactory
} from '../factories'
import RouteGuard from '../guards/passport'
import AdminGuard from '../guards/admin'

export default (router:Router) => {
    router.route('/game-category')
          .all(RouteGuard().authenticate())
          .get(routeAdapter(readCategoryFactory()))
          .post(AdminGuard(routeAdapter(createCategoryFactory())))
          .put(AdminGuard(routeAdapter(updateCategoryFactory())))
          .delete(AdminGuard(routeAdapter(deleteCategoryFactory())))

    router.route('/game-category/all')
          .all(RouteGuard().authenticate())
          .get(routeAdapter(readAllCategoryFactory()))    
}