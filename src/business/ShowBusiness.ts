import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { AuthenticationData, Authenticator } from "../services/Authenticator";
import { AddShowInputDTO, GetShowOutput, Show, SHOW_WEEKDAY } from "../model/Show";
import { CustomError } from "../error/CustomError";
import { USER_ROLES } from "../types/USER_ROLES";

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public addShow = async (input: AddShowInputDTO) => {
        const { bandId, weekDay, startTime, endTime, token } = input

        const authentication = this.authenticator.getTokenData(token) as AuthenticationData

        if (!authentication) {
            throw new CustomError(401, "Token inválido")
        }

        if (authentication.role !== USER_ROLES.ADMIN) {
            throw new CustomError(403, "Usuário sem acesso!")
        }

        if (!bandId || !weekDay || !startTime || !endTime) {
            throw new CustomError(422, "Um ou mais campos vazios!")
        }

        if (weekDay !== SHOW_WEEKDAY.SEXTA && weekDay !== SHOW_WEEKDAY.SABADO && weekDay !== SHOW_WEEKDAY.DOMINGO) {
            throw new CustomError(422, "Dia da semana deve ser sexta, sábado ou domingo")
        }

        if (startTime === NaN || !Number.isInteger(startTime) || startTime < 8 && startTime > 22) {
            throw new CustomError(422, "Horário de ínicio tem que ser das 8h às 22h")
        }

        if (endTime === NaN || !Number.isInteger(endTime) || endTime < 9) {
            throw new CustomError(422, "Horário de término tem que ser das 9h às 23h")
        }

        const showRegistered: GetShowOutput[] = await this.showDatabase.getShowByDayAndTime(weekDay, startTime, endTime)

        if (showRegistered.length > 0) {
            throw new CustomError(409, "Há um conflito de horário")
        }

        const id: string = this.idGenerator.generateId()

        const show: Show = new Show(id, weekDay, startTime, endTime, bandId)

        await this.showDatabase.insertShow(show)
    }
    public getAllShows = async (token: string, weekDay: string) : Promise<GetShowOutput[]> => {
    
        const authentication = this.authenticator.getTokenData(token) as AuthenticationData

        if (!authentication) {
            throw new CustomError(401, "Token inválido")
        }
        if (weekDay !== SHOW_WEEKDAY.SEXTA && weekDay !== SHOW_WEEKDAY.SABADO && weekDay !== SHOW_WEEKDAY.DOMINGO || !weekDay ) {
            throw new CustomError(422, "Dia da semana deve ser sexta, sábado ou domingo")
        }

        const shows: GetShowOutput[] = await this.showDatabase.getAllShows(weekDay)

        return shows
    }

}