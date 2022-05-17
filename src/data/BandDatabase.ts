import { Band, GetBandOutput } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    private TABLE_NAME: string = "tabela_bandas"

    public getBandByName = async (name: string): Promise<GetBandOutput> => {
        try {
            const result: GetBandOutput[] = await BandDatabase.connection(this.TABLE_NAME)
                .where({ name })

            return result[0]

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public insertBand = async (input: Band): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert({
                    id: input.getId(),
                    name: input.getName(),
                    music_genre: input.getMusicGenre(),
                    responsible: input.getResponsible()
                })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getBandByNameOrId = async (search: string): Promise<GetBandOutput> => {

        try {
            const result: GetBandOutput[] = await BandDatabase.connection(this.TABLE_NAME)
                .where("id", "like", `%${search}%`)
                .orWhere("name", "like", `%${search}%`)
                .select(
                    "id", 
                    "name",
                    "music_genre as musicGenre",
                    "responsible" 
                )

            return result[0]

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}