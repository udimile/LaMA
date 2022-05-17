export class Show {
    constructor(
        private id: string,
        private weekDay: string,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getWeekDay(): string {
        return this.weekDay
    }

    public getStartTime(): number {
        return this.startTime
    }

    public getEndTime(): number {
        return this.endTime
    }

    public getBandId(): string {
        return this.bandId
    }
}

export interface AddShowInputDTO {
    bandId: string
    weekDay: SHOW_WEEKDAY
    startTime: number
    endTime: number
    token: string
}

export enum SHOW_WEEKDAY {
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}

export interface GetShowOutput {
    id: string
    weekDay: SHOW_WEEKDAY
    startTime: number
    endTime: number
    bandId: string
}