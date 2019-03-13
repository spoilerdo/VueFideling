import shop from '../../api/shop';
import { SET_PRODUCTS, DECREMENT_PRODUCT_INVENTORY, ADD_PRODUCT } from './mutation-types';

//initial state
const state = {
    all: []
}

//getters (no getters lol)
const getters = {}

//mutations
const mutations = {
    [SET_PRODUCTS] (state, products) {
        state.all = products
    },

    [ADD_PRODUCT] (state, product){
        const p = state.all.find(p => p.id === product.id)
        if(p !== null){
            p.inventory = product.inventory;
        } else{
            state.all.push(product)
        }
    },

    [DECREMENT_PRODUCT_INVENTORY] (state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}

//actions
const actions = {
    getAllProducts ({ commit }) {
        shop.getProducts(products => {
            commit(SET_PRODUCTS, products)
        })
    },
    addProduct({ commit }, product){
        shop.addProduct(product, () => {
            commit(ADD_PRODUCT, product)
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}