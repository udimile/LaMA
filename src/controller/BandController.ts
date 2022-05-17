import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { CustomError } from "../error/CustomError";
import { RegisterBandInputDTO } from "../model/Band";

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) { }

    public registerBand = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const { name, musicGenre, responsible } = req.body

            const input: RegisterBandInputDTO = {
                name,
                musicGenre,
                responsible,
                token
            }

            await this.bandBusiness.registerBand(input)

            res.status(201).send({ message: "Banda registrada com sucesso!" })
        }
        catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
            } else if (error instanceof Error) {
                res.status(400).send(error.message)
            }
        }
    }

    public getBand = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const search = req.query.search as string
            
            const band = await this.bandBusiness.getBand(token, search)
           

            res.status(200).send({ band })
        }
        catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
            } else if (error instanceof Error) {
                res.status(400).send(error.message)
            }
        }
    }
}