// (409, "Nome da banda já cadastrada!")
// (422, "Um ou mais campos vazios!")
// Sucesso

import { BandBusiness } from "../src/business/BandBusiness"
import { CustomError } from "../src/error/CustomError"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { BandDatabaseMock } from "./mocks/BandDatabaseMock"
import { IdGeneratorMock } from "./mocks/IdGeneratorMock"

const bandBusinessMock = new BandBusiness(
    new BandDatabaseMock() as any,
    new IdGeneratorMock(),
    new AuthenticatorMock()
)

describe("Teste do endpoint de registrar bandas", () => {
    test("Receber erro de nome da banda já registrada", async () => {
        expect.assertions(2)
        const input = {
            name: "Fall Out Boy",
            musicGenre: "Rock Alternativo",
            responsible: "Patrick Stump",
            token: "token_mockado"
        }

        try {
            await bandBusinessMock.registerBand(input)
        }
        catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Nome da banda já cadastrada!")
                expect(error.statusCode).toEqual(409)
            } else {
                console.log(error)
            }
        }
    })

    test("Receber erro de um ou mais campos vazios", async () => {
        expect.assertions(2)
        const input = {
            name: "",
            musicGenre: "",
            responsible: "",
            token: "token_mockado"
        }

        try {
            await bandBusinessMock.registerBand(input)
        }
        catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Um ou mais campos vazios!")
                expect(error.statusCode).toEqual(422)
            } else {
                console.log(error)
            }
        }
    })

    test("Sucesso ao registrar banda", async () => {
        expect.assertions(1)
        const input = {
            name: "Nirvana",
            musicGenre: "Rock Grunge",
            responsible: "Kurt Cobain",
            token: "token_mockado"
        }

        try {
            const result = await bandBusinessMock.registerBand(input)
            expect(result).toEqual({ message: "Banda registrada com sucesso!" })
        }
        catch (error) {
            console.log(error)
        }
    })
})