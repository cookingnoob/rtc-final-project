import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const readCsvFiles = (document) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const csvFilePath = path.join(
        __dirname,'.','csvs',`${document}`
    )
    console.log(csvFilePath)
}

export {readCsvFiles}