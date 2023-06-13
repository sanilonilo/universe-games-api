import {HttpResponse} from '../../protocols'

export function BadRequest(error:Error):HttpResponse{
    return {
        status:400,
        body: error
    }
}