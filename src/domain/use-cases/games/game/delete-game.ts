export interface DeleteGameUseCase{
    delete: (identifier:any) => Promise<any>
}