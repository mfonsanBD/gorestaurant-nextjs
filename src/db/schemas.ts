import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  photo: text('photo').notNull(),
  price: real().notNull(),
  isActive: integer({ mode: 'boolean' }).default(true).notNull(),
})
