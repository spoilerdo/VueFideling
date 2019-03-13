<template>
    <ul>
        <li
            v-for="product in products"
            :key="product.id">
            {{ product.title }} - x{{ product.inventory }}
            <br>
            <button
                @click="addProduct(product)">
                Add 1 to stock
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
    methods: mapActions('products', [
        'addProduct'
    ]),
}
</script>