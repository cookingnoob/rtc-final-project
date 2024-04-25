import { log } from 'console'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const readCsvFiles = (document) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const csvFilePath = path.join(
        __dirname,'.','csvs',`${document}`
    )

    const fileText = fs.readFileSync(csvFilePath).toString()
    const allLines = fileText.split("\n")

    const headers = allLines[0]
    const dataLines = allLines.slice(1)

    const fieldNames = headers.split(",")

    let objList = []

    for(let i = 0; i < dataLines.length; i++){
        let obj = {}
        const data = dataLines[i].split(',')
        for(let j = 0; j< fieldNames.length; j++){
            const fieldName = fieldNames[j]
            obj[fieldName] = data[j]
        } 
        objList.push(obj)
    }
    const jsonText = JSON.stringify(objList)
    const originalDocument = document.split('.')
    const documentName = originalDocument.shift()
    const seedsPath = path.join(__dirname, 'seeds')
    const jsonFilePath = path.join(seedsPath, `${documentName}.json`)

    fs.writeFileSync(jsonFilePath, jsonText)

  
}

export {readCsvFiles}