import products from '../data/products.json'

type Product = {
  id: number
  name: string
  price: number
  image: string
}

export const useProductsStore = defineStore(
  'products-store',
  {
    state: () => (
      {
        products: products as Product[],
      }
    ),
    getters: {},
    actions: {},
  }
)