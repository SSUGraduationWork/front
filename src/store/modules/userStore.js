const userStore = {
    namespaced: true,
    state: {
        user_id: null,
        jwtToken: null,
        role: null,
    },
    mutations: {
        setUserId(state, id){
            state.user_id = id;
        },
        setJwtToken(state, token){
            state.jwtToken = token
        },
        setRole(state, role){
            state.role = role
        }
    }
}
export default userStore;