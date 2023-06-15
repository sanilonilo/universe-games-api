export interface CompareEncryptHash{
    compare:(value:string,valueHashed:string) => Promise<boolean> 
}