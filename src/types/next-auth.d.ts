/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id?: number
  }

  interface Session {
    user: {
      id?: number
    } & DefaultSession['user']
  }
}
