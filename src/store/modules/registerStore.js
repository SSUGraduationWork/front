const registerStore = {
    namespaced: true,
    state: {
        user_email: null,
        picture_url: null,
    },
    mutations: {
        setUserEmail(state, email) {
            state.user_email = email;
        },
        setPictureUrl(state, url) {
            state.picture_url = url;
        },
    }
}
export default registerStore;