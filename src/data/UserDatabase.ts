import { GetUserOutput, User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private TABLE_NAME: string = "tabela_usuarios"

    public insertUser = async (user: User): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert(user)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getUserByEmail = async (email: string): Promise<GetUserOutput> => {
        try {
            const result: GetUserOutput[] = await BaseDatabase.connection(this.TABLE_NAME)
                .where({ email })

            return result[0]

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}