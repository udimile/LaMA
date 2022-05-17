import * as jwt from "jsonwebtoken"
import { USER_ROLES } from "../types/USER_ROLES"

export class Authenticator {
    public generateToken = (payload: AuthenticationData): string => {
        return jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
            }
        )
    }

    public getTokenData = (token: string): AuthenticationData | null => {
        try {
            return jwt.verify(
                token,
                process.env.JWT_KEY as string
            ) as AuthenticationData
        }
        catch (err) {
            console.log(err)
            return null
        }
    }
}

export type AuthenticationData = {
    id: string
    role: USER_ROLES
}