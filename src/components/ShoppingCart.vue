<template>
    <div>
        <h2>Your cart</h2>
        <p v-show="!products.length"><i>Please add some products to cart.</i></p>
        <ul>
            <li
                v-for="product in products"
                :key="product.id">
                {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
            </li>
        </ul>
        <p>Total: {{ total | currency}}</p>
        <p>
            <button 
                :disabled="!products.length" 
                @click="checkout(products)">
                Checkout
            </button>
        </p>
        <p 
            v-show="checkoutStatus">
            Checkout {{ checkoutStatus }}.
        </p>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            checkoutStatus: state => state.cart.checkoutStatus
        }),
        //TODO: maybe add some constant types??
        ...mapGetters('cart', {
            products: 'cartProducts',
            total: 'cartTotalPrice'
        })
    },
    methods: {
        ...mapActions('cart', [
            'checkout'
        ]),
    }
}
</script>