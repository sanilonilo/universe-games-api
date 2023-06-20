import {
    CreateCategoryGameController,
    ReadCategoryGameController,
    ReadAllCategoryGameController,
    UpdateCategoryGameController,
    DeleteCategoryGameController
} from '../../../presentation/controllers/games/category'
import {
    DbCreateCategoryGame,
    DbReadCategoryGame,
    DbReadAllCategoryGame,
    DbUpdateCategoryGame,
    DbDeleteCategoryGame
} from '../../../data/use-cases/games/category'
import {
    CreateCategoryPostgresRepository,
    ReadCategoryPostgresRepository,
    ReadAllCategoryPostgresRepository,
    UpdateCategoryPostgresRepository,
    DeleteCategoryPostgresRepository
} from '../../../infra/db/postgres/repositories/games/category'

export const createCategoryFactory = ():CreateCategoryGameController => {
    const createCategoryRepository = new CreateCategoryPostgresRepository()
    const createCategoryUseCase = new DbCreateCategoryGame(createCategoryRepository)
    const createCategoryGameController = new CreateCategoryGameController(createCategoryUseCase)
    return createCategoryGameController
}

export const readCategoryFactory = ():ReadCategoryGameController => {
    const readCategoryRepository = new ReadCategoryPostgresRepository()
    const readCategoryUseCase = new DbReadCategoryGame(readCategoryRepository)
    const readCategoryGameController = new ReadCategoryGameController(readCategoryUseCase)
    return readCategoryGameController
}

export const readAllCategoryFactory = ():ReadAllCategoryGameController => {
    const readAllCategoryRepository = new ReadAllCategoryPostgresRepository()
    const readAllCategoryUseCase = new DbReadAllCategoryGame(readAllCategoryRepository)
    const readAllCategoryGameController = new ReadAllCategoryGameController(readAllCategoryUseCase)
    return readAllCategoryGameController
}

export const updateCategoryFactory = ():UpdateCategoryGameController => {
    const updateCategoryRepository = new UpdateCategoryPostgresRepository()
    const updateCategoryUseCase = new DbUpdateCategoryGame(updateCategoryRepository)
    const updateCategoryGameController = new UpdateCategoryGameController(updateCategoryUseCase)
    return updateCategoryGameController
}

export const deleteCategoryFactory = ():DeleteCategoryGameController => {
    const deleteCategoryRepository = new DeleteCategoryPostgresRepository()
    const deleteCategoryUseCase = new DbDeleteCategoryGame(deleteCategoryRepository)
    const deleteCategoryGameController = new DeleteCategoryGameController(deleteCategoryUseCase)
    return deleteCategoryGameController
}