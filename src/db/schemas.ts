import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
})

export const products = sqliteTable('product', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  photo: text('photo').notNull(),
  price: real().notNull(),
  isActive: integer({ mode: 'boolean' }).default(true).notNull(),
})
