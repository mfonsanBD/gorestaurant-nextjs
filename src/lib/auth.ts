/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcrypt'
import { db } from '@/db'
import { users } from '@/db/schemas'
import { eq } from 'drizzle-orm'

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db), // Conectar o Auth.js ao Drizzle ORM
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin/login', // Página de login personalizada
  },
  session: {
    strategy: 'jwt', // Usar JWT para sessões
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email
        const password = credentials?.password

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email!))
          .limit(1)

        if (!user) {
          throw new Error('Usuário não encontrado')
        }

        const isValid = await bcrypt.compare(password!, user[0].password)
        if (!isValid) {
          throw new Error('Senha Incorreta')
        }

        return user[0]
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as number
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
  },
}
