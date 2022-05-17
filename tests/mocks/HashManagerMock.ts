export class HashManagerMock {
    public createHash = (password: string): string => {
        return "hash_password"
    }

    public compareHash = (password: string, cypherPassword: string): boolean => {
        return password === cypherPassword
    }
}