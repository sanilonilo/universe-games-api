export interface Controller{
    action:(httpRequest:any) => Promise<any>
}