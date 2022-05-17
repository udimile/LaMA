import { USER_ROLES } from "../types/USER_ROLES"

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ) { }
}

export interface SignupInputDTO {
    name: string
    email: string
    password: string
    role: USER_ROLES
}

export interface GetUserOutput {
    id: string
    name: string
    email: string
    password: string
    role: USER_ROLES
}

export interface LoginInputDTO {
    email: string
    password: string
}