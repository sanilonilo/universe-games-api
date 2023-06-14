import {HttpResponse} from '../../protocols'

export function ServerError(message:string):HttpResponse{
    return {
        status:500,
        body: message
    }
}