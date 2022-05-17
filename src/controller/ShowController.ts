import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { CustomError } from "../error/CustomError";
import { AddShowInputDTO, SHOW_WEEKDAY } from "../model/Show";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    public addShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const { bandId, weekDay, startTime, endTime } = req.body

            const input: AddShowInputDTO = {
                bandId,
                weekDay: weekDay.toUpperCase().replace("Á", "A"),
                startTime,
                endTime,
                token
            }

            await this.showBusiness.addShow(input)

            res.status(201).send({ message: "Show cadastrado com sucesso!" })
        }
        catch (error: any) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send(error.message)
            } else if (error instanceof Error) {
                res.status(400).send(error.message)
            }
        }
    }

    public getAllShows = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const weekDay: string = req.params.weekDay.toUpperCase()

            const shows = await this.showBusiness.getAllShows(token, weekDay)
           

           

            res.status(200).send({ shows })
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