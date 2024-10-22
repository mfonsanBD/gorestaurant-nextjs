import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import https from 'https'

export async function POST(req: NextRequest) {
  try {
    const { url, filename } = await req.json()

    await new Promise<void>((resolve, reject) => {
      https
        .get(url, (response) => {
          const fileStream = fs.createWriteStream(`public/upload/${filename}`)

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

    return NextResponse.json(
      {
        message: 'Ok',
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: 'Error',
      },
      { status: 500 },
    )
  }
}
