/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
})

export async function POST(req: NextRequest) {
  try {
    const { file } = await req.json()

    if (file) {
      const fileUrl = (
        await cloudinary.uploader.upload(file, { folder: 'picanhadojorginho' })
      ).secure_url
      return NextResponse.json(fileUrl, { status: 201 })
    } else {
      return NextResponse.json(
        { message: 'Campo de foto é obrigatório' },
        { status: 400 },
      )
    }
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
