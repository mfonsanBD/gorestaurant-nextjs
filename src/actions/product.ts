'use server'

import { db } from '@/db'
import { products } from '@/db/schemas'
import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'

type newProduct = typeof products.$inferInsert

export async function getProducts() {
  try {
    return await db.select().from(products)
  } catch (error) {
    console.error(error)
  }
}

export async function addProduct(product: newProduct) {
  try {
    await db.insert(products).values(product)
    revalidateTag('products')

    return {
      message: 'Produto adicionado com sucesso!',
      statusCode: 201,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Erro interno do servidor. Tente novamente mais tarde!',
      statusCode: 500,
    }
  }
}

export async function deleteProduct(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id))
    revalidateTag('products')

    return {
      message: 'Produto excluido com sucesso!',
      statusCode: 200,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Erro interno do servidor. Tente novamente mais tarde!',
      statusCode: 500,
    }
  }
}

export async function updateProductStatus(status: boolean, id: number) {
  try {
    await db
      .update(products)
      .set({ isActive: status })
      .where(eq(products.id, id))

    revalidateTag('products')

    return {
      message: `O produto agora está ${status ? 'ativo' : 'inativo'}`,
      statusCode: 200,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Erro interno do servidor. Tente novamente mais tarde!',
      statusCode: 500,
    }
  }
}

export async function editProduct(product: ProductsProps) {
  try {
    await db.update(products).set(product).where(eq(products.id, product.id!))
    revalidateTag('products')

    return {
      message: 'Produto alterado com sucesso!',
      statusCode: 201,
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Erro interno do servidor. Tente novamente mais tarde!',
      statusCode: 500,
    }
  }
}
