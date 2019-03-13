import jwt_decode from 'jwt-decode';
import { LOGIN, LOGIN_URL } from './mutation-types';
import { apiCall, setTokenHeader } from '../../services/api';

//initial state
const state = {
    isAuthenticated: false,
    user: ""
}

//getters
const getters = {};

//mutations
const mutations = {
    [LOGIN] (state, userData){
        state.user = userData,
        state.isAuthenticated = true
    }
}

//actions
const actions = {
    setAuthorizationToken(token){
        setTokenHeader(token);
    },
    async login({ commit }, userData) {
        try{
            const req = await apiCall('post', LOGIN_URL, userData);
            var decoded = jwt_decode(req.token);
            decoded.scopes.forEach(scope => {
                if (scope == 'ADMIN') {
                    localStorage.setItem('jwtToken', req.token);
                    setTokenHeader(req.token);
                    commit(LOGIN, userData.username);
                }
            });
        }catch (e){
            console.log(e);
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