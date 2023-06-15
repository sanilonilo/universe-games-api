export interface DecodeTokenJWT{
    decode:(token:string,secretKey:string) => Promise<any>
}