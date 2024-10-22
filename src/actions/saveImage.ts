'use server'

import fs from 'fs'
import https from 'https'

export async function saveFromUrl(url: string, fileName: string) {
  return new Promise<void>((resolve, reject) => {
    https
      .get(url, (response) => {
        const fileStream = fs.createWriteStream(`public/upload/${fileName}`)

        response.pipe(fileStream)

        fileStream.on('finish', () => {
          fileStream.close()
          resolve()
        })

        fileStream.on('error', (err) => {
          reject(err)
        })
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
