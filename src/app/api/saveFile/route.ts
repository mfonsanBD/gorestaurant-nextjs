/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData()
    const file = formdata.get('file') as File
    const filename = formdata.get('fileName')

    const buffer = await file.arrayBuffer()
    const view = new Uint8Array(buffer)
    fs.writeFileSync(`public/upload/${filename}`, view)

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
