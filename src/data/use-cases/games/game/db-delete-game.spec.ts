import {DbDeleteGame} from './'
import {GameRepository} from '../../../repositories'

class DeleteGameRepositoryStub implements GameRepository.Game.DeleteGame{
    async delete(identifier:any): Promise<any>{
        return new Promise<void>(resolve => resolve())
    }
}

const makeSut = () => {
    const deleteGameRepositoryStub = new DeleteGameRepositoryStub()
    const sut = new DbDeleteGame(deleteGameRepositoryStub)
    return {
        sut,
        deleteGameRepositoryStub
    }
}

describe('DbDeleteGame', () => {
    test('Delete game repository: throw error', async () => {
        const {deleteGameRepositoryStub} = makeSut()

        vi.spyOn(deleteGameRepositoryStub,'delete').mockRejectedValueOnce(new Error())

        await expect(deleteGameRepositoryStub.delete).rejects.toThrow()
    })

    test('Delete game repository: success', async () => {
        const {sut} = makeSut()
        vi.spyOn(sut,'delete')
        const identifier = {
            id:1
        }
        
        await sut.delete(identifier)

        expect(sut.delete).toBeTruthy()
    })
})