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
        products: [] as Product[],
      }
    ),
    getters: {},
    actions: {
      async retrieveProducts() {
        this.products = products
      }
    },
  }
)