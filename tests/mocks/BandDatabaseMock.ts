import { Band } from "../../src/model/Band";
import { band } from "./BandMock";

export class BandDatabaseMock {

    public getBandByName = async (name: string): Promise<Band | undefined> => {
        if (name === "Fall Out Boy") {
            return band
        } else {
            return undefined
        }
    }

    public insertBand = async (input: Band): Promise<void> => { }

    public getBandByNameOrId = async (search: string): Promise<Band | undefined> => {
        if ("Fall Out Boy".includes(search) || "id_mockado".includes(search)) {
            return band
        } else {
            return undefined
        }
    }
}