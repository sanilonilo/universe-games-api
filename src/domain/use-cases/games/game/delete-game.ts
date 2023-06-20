export interface DeleteGameUsecase{
    delete: (identifier:any) => Promise<any>
}