<template>
    <ul>
        <!-- iterate trough every product in products (wich has been made at the export default mapState func) -->
        <li
            v-for="product in products"
            :key="product.id">
            {{ product.title }} - {{ product.price | currency }}
            <br>
            <button
                :disabled="!product.inventory"
                @click="addProductToCart(product)">
                Add to cart
            </button>
        </li>
    </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    //Get all products from the store and put them in a local state
    computed: mapState({
        products: state => state.products.all
    }),
    //Add an action to the local state so u can use it
    methods: mapActions('cart', [
        'addProductToCart'
    ]),
    //When created call the action to get all products from api and put it in the store
    created() {
        this.$store.dispatch('products/getAllProducts')
    }
}
</script>