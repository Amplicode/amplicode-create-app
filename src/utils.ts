import * as fs from "fs";

export const dirIsEmpty = (path: string) => {
    const files = fs.readdirSync(path)
    return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export const isValidAppName = (appName: string) => {
    return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
        appName,
    )
}
