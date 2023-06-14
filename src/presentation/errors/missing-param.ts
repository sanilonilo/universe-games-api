export class MissingParamError extends Error{
    constructor(param:string){
        const message = `Missing param ${param}`
        super(message)
        this.name = message
    }
}