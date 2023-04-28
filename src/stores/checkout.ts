export type CartItemData = {
  productId: string
  productName: string
  price: number
}

export type CartItem = CartItemData & {
  quantity: number
  subTotal: number
}

export type CartItems = {
  [name: string]: CartItem
}

export const useCheckoutStore = defineStore(
  'cart-store',
  {
    state: () => (
      {
        items: {} as CartItems,
        cardHolderFullName: undefined as string | undefined,
        tokenizedCard: undefined as string | undefined,
        checkoutShowModal: false,
        checkoutHasError: false,
        checkoutPaymentResponse: undefined as string | undefined,
      }
    ),
    getters: {
      totalBillable: (state): string => {
        let sum = 0
        for (const key in state.items) {
          sum = sum + state.items[key].subTotal
        }
        return sum.toFixed(2).toLocaleString()
      },
      itemCount: (state): number => {
        let sum = 0
        for (const key in state.items) {
          sum = sum + state.items[key].quantity
        }
        return sum
      }
    },
    actions: {
      addToCart(cartItemData: CartItemData) {
        const { productId, productName, price } = cartItemData;
        if (!this.items[productId]) {
          this.items[productId] = {
            productId,
            productName,
            price: price,
            quantity: 0,
            subTotal: 0,
          }
        }

        this.items[productId].quantity++
        this.items[productId].subTotal = price * this.items[productId].quantity
      },
      removeFromCart(cartItemData: CartItemData) {
        const { productId, price } = cartItemData
        if (this.items[productId]) {
          this.items[productId].quantity--
          this.items[productId].subTotal = price * this.items[productId].quantity

          if (this.items[productId].quantity === 0) {
            delete this.items[productId]
          }
        }
      },
      clearCart() {
        this.items = {}
      },
      setTokenizedCard(tokenizedCard: string | undefined) {
        this.tokenizedCard = tokenizedCard
      },
      setCardHolderFullName(fullName: string | undefined) {
        this.cardHolderFullName = fullName
      },
      toggleCheckoutModal() {
        this.checkoutShowModal = !this.checkoutShowModal
      },
      setCheckoutShowModal(showModal: boolean) {
        this.checkoutShowModal = showModal
      },
      setCheckoutHasError(hasError: boolean) {
        this.checkoutHasError = hasError
      },
      setCheckoutPaymentResponse(paymentResponse: string | undefined) {
        this.checkoutPaymentResponse = paymentResponse
      },
    },
  }
)