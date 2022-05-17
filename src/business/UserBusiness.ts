import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { GetUserOutput, LoginInputDTO, SignupInputDTO, User } from "../model/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { USER_ROLES } from "../types/USER_ROLES";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO): Promise<string> => {
        const { name, email, password, role } = input

        const emailRegistered: GetUserOutput = await this.userDatabase.getUserByEmail(email)

        if (emailRegistered) {
            throw new CustomError(409, "Email já cadastrado!")
        }

        if (email.indexOf("@") < 2) {
            throw new CustomError(422, "Email inválido!")
        }

        if (!name || !email || !password || !role) {
            throw new CustomError(422, "Um ou mais campos vazios!")
        }

        if (role !== USER_ROLES.NORMAL && role !== USER_ROLES.ADMIN) {
            throw new CustomError(422, "Campo 'role' deve ser ADMIN ou NORMAL")
        }


        const id: string = this.idGenerator.generateId()

        const cypherPassword: string = this.hashManager.createHash(password)

        const user: User = new User(id, name, email, cypherPassword, role)

        await this.userDatabase.insertUser(user)

        const token: string = this.authenticator.generateToken({ id, role })

        return token


    }

    public login = async (input: LoginInputDTO): Promise<string> => {
        const { email, password } = input

        const emailRegistered: GetUserOutput = await this.userDatabase.getUserByEmail(email)

        if (!email || !password) {
            throw new CustomError(422, "Um ou mais campos vazios!")
        }

        if (!emailRegistered) {
            throw new CustomError(404, "Email não encontrado!")
        }

        const isPasswordCorrect: boolean = this.hashManager.compareHash(password, emailRegistered.password)

        if (!isPasswordCorrect) {
            throw new CustomError(401, "Senha incorreta!")
        }

        const token: string = this.authenticator.generateToken({ id: emailRegistered.id, role: emailRegistered.role })

        return token
    }
}