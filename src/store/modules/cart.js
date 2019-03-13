import shop from '../../api/shop';
import { SET_CHECKOUT_STATUS, SET_CART_ITEMS, PUSH_PRODUCT_TO_CART, INCREMENT_ITEM_QUALITY, PRODUCTS, DECREMENT_PRODUCT_INVENTORY } from './mutation-types';

//initial state
//shape: items [ item 1 { id, quantity }]
const state = {
    items: [],
    checkoutStatus: null
}

//getters
const getters = {
    //Detail view of a selected product (title, price, quantity)
    cartProducts: (state, getters, rootState) => {
        //iterate trough every item
        return state.items.map(({ id, quantity }) => {
            //get the product by it's id
            const product = rootState.products.all.find(product => product.id === id)
            //return the title, price and quantity of the product
            return {
                title: product.title,
                price: product.price,
                quantity
            }
        })
    },

    cartTotalPrice: (state, getters) => {
        //itterates trough every item in the array (it uses the cartProducts getter)
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }
}

//mutations (reducers)
const mutations = {
    [PUSH_PRODUCT_TO_CART] (state, { id }) {
        state.items.push({
            id,
            quantity: 1
        })
    },

    [INCREMENT_ITEM_QUALITY] (state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++
    },

    [SET_CART_ITEMS] (state, { items }){
        state.items = items
    },

    [SET_CHECKOUT_STATUS] (state, status) {
        state.checkoutStatus = status
    }
}

//actions
const actions = {
    checkout({ commit, state }, products) {
        const savedCartItems = [...state.items]

        //call mutation (does this work???)
        commit(SET_CHECKOUT_STATUS, null)

        //empty cart
        commit(SET_CART_ITEMS, { items: [] })

        //first () = a succes callback and the second a error callback (wich in this case will always trigger)
        shop.buyProducts(
            products,
            () => commit(SET_CHECKOUT_STATUS, 'successful'),
            () => {
                commit(SET_CHECKOUT_STATUS, 'failed')
                //rollback to the cart saved before sending the request
                commit(SET_CART_ITEMS, { items: savedCartItems })
            }
        )
    },

    addProductToCart({ state, commit }, product) {
        commit(SET_CHECKOUT_STATUS, null)

        if(product.inventory > 0) {
            const cartItem = state.items.find(item => item.id === product.id)
            if(!cartItem){
                //product not already in the cart so... ad it
                commit(PUSH_PRODUCT_TO_CART, { id: product.id })
            } else {
                //product already in the cart but... quantity increases
                commit(INCREMENT_ITEM_QUALITY, cartItem)
            }

            //remove 1 item from stock (call product module)
            commit(PRODUCTS + DECREMENT_PRODUCT_INVENTORY, { id: product.id }, { root: true })
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}