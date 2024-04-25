import { log } from 'console'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {parse} from 'csv-parse/sync'

const readCsvFiles = (document) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const csvFilePath = path.join(
        __dirname,'.','csvs',`${document}`
    )

    const fileText = fs.readFileSync(csvFilePath)
    const convertDataTypes = (records) => {
        if(document  === 'users.csv'){
            return records.map(record => {
                return {
                    name: record.Name, 
                    email: record.Email, 
                    password: record.Password, 
                    lists: record.Lists.split(","), 
                    avatar: record.Avatar, 
                };
            });
        }else if (document === 'lists.csv'){
            return records.map(record => {
                return {
                    id: Number(record.ID),
                    listName: record.ListName,
                    color: record.Color,
                    user: record.User,
                    sharedUsers: record.SharedUsers.split(","),
                    global: Boolean(record.Global),
                    ratings: Number(record.Ratings),
                }
            })
        }else if (document === 'to-dos.csv'){
            return records.map(record => {
                return {
                    id: Number(record.ID),
                    listID: Number(record.ListID),
                    description: record.Description,
                    done: Boolean(record.Done),
                    doneByXDate: Date(record.DoneByXDate),
                    howMuchTimeItTakes: record.HowMuchTimeItTakes,
                    notes: record.Notes,
                    files: record.Files
                }
            })
        }
    }
    const records = parse(fileText, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
        relax: true
    })
  
    const recordWithType = convertDataTypes(records)
  
    const jsonText = JSON.stringify(recordWithType)
    const originalDocument = document.split('.')
    const documentName = originalDocument.shift()
    const seedsPath = path.join(__dirname, 'seeds')
    const jsonFilePath = path.join(seedsPath, `${documentName}.json`)

    fs.writeFileSync(jsonFilePath, jsonText)

  return
}

export {readCsvFiles}