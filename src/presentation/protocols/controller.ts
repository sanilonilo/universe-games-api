import {HttpRequest,HttpResponse} from './'

export interface Controller{
    action:(httpRequest:HttpRequest) => Promise<HttpResponse>
}