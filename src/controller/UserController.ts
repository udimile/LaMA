import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { CustomError } from "../error/CustomError";
import { LoginInputDTO, SignupInputDTO } from "../model/User";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password, role } = req.body

            const input: SignupInputDTO = {
                name,
                email,
                password,
                role: role.toUpperCase()
            }

            const token: string = await this.userBusiness.signup(input)

            res.status(201).send({ token, message: "Usuário criado com sucesso!" })
        }
        catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
            } else if (error instanceof Error) {
                res.status(400).send(error.message)
            }
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try{
            const{email, password} = req.body

            const input: LoginInputDTO = {
                email,
                password
            }
            const token: string = await this.userBusiness.login(input)

            res.status(200).send({token, message: "Login realizado com sucesso!"})
        } 
        catch(error: any){
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
            } else if (error instanceof Error) {
                res.status(400).send(error.message)
            }

        }
    }


}