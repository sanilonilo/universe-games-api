import {
    CreateGameController,
    ReadGameController,
    ReadAllGameController,
    UpdateGameController,
    DeleteGameController
} from '../../../presentation/controllers/games/game'
import {
    DbCreateGame,
    DbReadGame,
    DbReadAllGame,
    DbUpdateGame,
    DbDeleteGame
} from '../../../data/use-cases/games/game'
import {
    CreateGamePostgresRepository,
    ReadGamePostgresRepository,
    ReadAllGamePostgresRepository,
    UpdateGamePostgresRepository,
    DeleteGamePostgresRepository
} from '../../../infra/db/postgres/repositories/games/game'

export const createGameFactory = ():CreateGameController => {
    const createCategoryRepository = new CreateGamePostgresRepository()
    const createCategoryUseCase = new DbCreateGame(createCategoryRepository)
    const createGameController = new CreateGameController(createCategoryUseCase)
    return createGameController
}

export const readGameFactory = ():ReadGameController => {
    const readCategoryRepository = new ReadGamePostgresRepository()
    const readCategoryUseCase = new DbReadGame(readCategoryRepository)
    const readGameController = new ReadGameController(readCategoryUseCase)
    return readGameController
}

export const readAllGameFactory = ():ReadAllGameController => {
    const readAllCategoryRepository = new ReadAllGamePostgresRepository()
    const readAllCategoryUseCase = new DbReadAllGame(readAllCategoryRepository)
    const readAllGameController = new ReadAllGameController(readAllCategoryUseCase)
    return readAllGameController
}

export const updateGameFactory = ():UpdateGameController => {
    const updateCategoryRepository = new UpdateGamePostgresRepository()
    const updateCategoryUseCase = new DbUpdateGame(updateCategoryRepository)
    const updateGameController = new UpdateGameController(updateCategoryUseCase)
    return updateGameController
}

export const deleteGameFactory = ():DeleteGameController => {
    const deleteCategoryRepository = new DeleteGamePostgresRepository()
    const deleteCategoryUseCase = new DbDeleteGame(deleteCategoryRepository)
    const deleteGameController = new DeleteGameController(deleteCategoryUseCase)
    return deleteGameController
}