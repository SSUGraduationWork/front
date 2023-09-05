const userStore = {
    namespaced: true,
    state: {
        user_id: null,
        jwtToken: null,
    },
    mutations: {
        setUserId(state, id){
            state.user_id = id;
        },
        setJwtToken(state, token){
            state.jwtToken = token
        }
    }
}
export default userStore;