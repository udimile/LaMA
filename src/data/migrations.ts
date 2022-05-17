import { BaseDatabase } from "./BaseDatabase"

class Migrations extends BaseDatabase {
    createTables = async (): Promise<void> => {
        BaseDatabase.connection
            .raw(`
        CREATE TABLE IF NOT EXISTS tabela_bandas (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            music_genre VARCHAR(255) NOT NULL,
            responsible VARCHAR(255) UNIQUE NOT NULL 
        )

        CREATE TABLE IF NOT EXISTS tabela_shows (
            id VARCHAR(255) PRIMARY KEY,
            week_day VARCHAR(255) NOT NULL,
            start_time INT NOT NULL,
            end_time INT NOT NULL,
            band_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(band_id) REFERENCES tabela_bandas(id)
        )

        CREATE TABLE IF NOT EXISTS tabela_usuarios (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
        )
    `)
            .then(console.log)
            .catch(console.log)
    }
}

const migrations: Migrations = new Migrations()
migrations.createTables()