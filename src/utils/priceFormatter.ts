export const FormatPrice = (price: number | bigint): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(price)
    .replace(/\s/g, '')
}
