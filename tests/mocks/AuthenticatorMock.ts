import { AuthenticationData } from "../../src/services/Authenticator"
import { USER_ROLES } from "../../src/types/USER_ROLES"

export class AuthenticatorMock {
    public generateToken = (payload: AuthenticationData): string => {
        return "token_mockado"
    }

    public getTokenData = (token: string): AuthenticationData => {
        return {
            id: "id_mockado",
            role: USER_ROLES.ADMIN
        }
    }
}