export interface EncodeTokenJWT{
    encode:(payload:any,secretKey:string) => Promise<string>
}