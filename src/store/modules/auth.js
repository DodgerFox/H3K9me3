import axios from 'axios'

export default {
    state: {
        userAuth: {
        }
      },
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try{
                axios.post("http://localhost:3000/api/login", {email, password})
                    .then((response) => {    
                        commit('setUser', response.data)
                        dispatch
                    })    
                    .catch((errors) => {    
                        console.log("Cannot log in", errors)    
                    })
            } catch (e){
                console.log(e, 'error');
            }
        },
        async getToken({user}) {
            
            try{
                axios.get("http://localhost:3000/api/login/session", user)
                    .then((response) => {    
                        console.log(response)
                    })    
                    .catch((errors) => {    
                        console.log("Cannot log in", errors)    
                    })
            } catch (e){
                console.log(e, 'error');
            }
        },
        async getUser({commit}, id) {
            let user;
            try {
                await axios.post("http://localhost:3000/api/user", {user: id})
                    .then((response) => {
                        user = response.data[0]
                        commit('setUser', response.data[0])
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } catch (e) {
                console.log(e);
            }
            return user
        }
    },
    mutations: {
        setUser (s, user) {
            s.userAuth = user;
        }
    },
    getters: {
        getAuthUser: s => s.authUser
    }
}