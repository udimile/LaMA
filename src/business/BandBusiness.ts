import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { Band, GetBandOutput, RegisterBandInputDTO } from "../model/Band";
import { CustomError } from "../error/CustomError";

export class BandBusiness {
    constructor(
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public registerBand = async (input: RegisterBandInputDTO): Promise<void> => {
        const { name, musicGenre, responsible, token } = input

        const authentication = this.authenticator.getTokenData(token) as AuthenticationData

        if (!authentication) {
            throw new CustomError(401, "Token inválido")
        }

        if (authentication.role !== "ADMIN") {
            throw new CustomError(403, "Usuário sem acesso!")
        }

        const bandRegistered: GetBandOutput = await this.bandDatabase.getBandByName(name)

        if (bandRegistered) {
            throw new CustomError(409, "Nome da banda já cadastrada!")
        }

        if (!name || !musicGenre || !responsible) {
            throw new CustomError(422, "Um ou mais campos vazios!")
        }

        const id: string = this.idGenerator.generateId()

        const band: Band = new Band(id, name, musicGenre, responsible)

        await this.bandDatabase.insertBand(band)
    }

    public getBand = async (token: string, search: string): Promise<GetBandOutput> => {
        const authentication = this.authenticator.getTokenData(token) as AuthenticationData

        if (!authentication) {
            throw new CustomError(401, "Token inválido")
        }
        const band: GetBandOutput = await this.bandDatabase.getBandByNameOrId(search)

        if (!band) {
            throw new CustomError(404, "Banda não encontrada!")
        }

        return band

    }
}