export class InvalidParamError extends Error{
    constructor(param:string){
        const message = `Invalid param ${param}`
        super(message)
        this.name = message
    }
}