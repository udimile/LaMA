import express from 'express'
import { ShowBusiness } from "../business/ShowBusiness"
import { ShowController } from "../controller/ShowController"
import { ShowDatabase } from "../data/ShowDatabase"
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const showRouter = express.Router()
const showBusiness = new ShowBusiness(
    new ShowDatabase(),
    new IdGenerator(),
    new Authenticator()
)

const showController = new ShowController(
    showBusiness
)

showRouter.post("/add", showController.addShow)
showRouter.get("/getAllShows/:weekDay", showController.getAllShows)