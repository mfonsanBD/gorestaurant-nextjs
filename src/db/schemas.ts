import { real, pgTable, text, boolean, serial } from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
})

export const products = pgTable('product', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  photo: text('photo').notNull(),
  price: real('price').notNull(),
  isActive: boolean('isActive').default(true).notNull(),
})
