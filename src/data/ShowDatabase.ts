import { GetShowOutput, Show, SHOW_WEEKDAY } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {
    private TABLE_NAME: string = "tabela_shows"

    public getShowByDayAndTime = async (
        weekDay: SHOW_WEEKDAY,
        startTime: number,
        endTime: number
    ): Promise<GetShowOutput[]> => {
        try {
            const result: GetShowOutput[] = await BaseDatabase.connection(this.TABLE_NAME)
                .where({ week_day: weekDay })
                .andWhere(function () {
                    this.where('start_time', '>=', `${startTime}`).andWhere('end_time', '<=', `${endTime}`)
                })
                .orWhere(function () {
                    this.where('start_time', '<', `${endTime}`).andWhere('end_time', '>', `${startTime}`)
                })

            return result

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public insertShow = async (show: Show): Promise<void> => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert({
                    id: show.getId(),
                    week_day: show.getWeekDay(),
                    start_time: show.getStartTime(),
                    end_time: show.getEndTime(),
                    band_id: show.getBandId()
                })

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public getAllShows = async (weekDay: SHOW_WEEKDAY): Promise<GetShowOutput[]> => {
        try {
           const result: GetShowOutput[] =  await BaseDatabase.connection(this.TABLE_NAME)
           .select(
               "name", 
               "music_genre as musicGenre",
           )
           .where({week_day: weekDay})
           .join("tabela_bandas", {"tabela_shows.band_id": "tabela_bandas.id" })
            
            return result

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}