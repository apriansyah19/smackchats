import { firebaseAuth, firebaseDB } from "boot/firebase";


let messagesRef

export function registerUser({ commit }, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('why');
            let userId = firebaseAuth.currentUser.uid
            firebaseDB.ref('users/' + userId).set({
                name: payload.name,
                email: payload.email,
                onLine: true
            }) 
        }).catch(error => {
            console.log(error.message);
        })
}

export function loginUser({ commit }, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
    }).catch(error => {
        console.log(error.message);
    })
}
export function logoutUser() {
    firebaseAuth.signOut()
}
 
export function handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            let userId = firebaseAuth.currentUser.uid
            firebaseDB.ref('users/' + userId).once('value', snapshot => {
                let userDetails = snapshot.val()
                commit('setUserDetails', {
                    name: userDetails.name,
                    email: userDetails.email,
                    userId: userId
                })
            })
            dispatch('firebaseUpdateUser', {
                userId: userId,
                updates: {
                    onLine: true
                }
            })
            dispatch('firebaseGetUser')
            if (this.$router.history.current.path !== '/') {
                this.$router.push('/')
            }
        } else {
            dispatch('firebaseUpdateUser', {
                userId: state.userDetails.userId,
                updates: {
                    onLine: false
                }
            })
            commit('setUserDetails', {})
            if (this.$router.history.current.path !== '/auth') {
                this.$router.replace('/auth')
            }
        }
      });
}
export function firebaseUpdateUser({ }, payload) {
    if (payload.userId) {
    firebaseDB.ref('users/' + payload.userId).update(payload.updates)
    }
}
 
export function firebaseGetUser({ commit }) {
    firebaseDB.ref('users').on('child_added', snapshot => {
        let userDetails = snapshot.val()
        let userId = snapshot.key
        commit('addUser', {
            userId,
            userDetails
        })
    })
    firebaseDB.ref('users').on('child_changed', snapshot => {
        let userDetails = snapshot.val()
        let userId = snapshot.key
        commit('updateUser', {
            userId,
            userDetails
        })
    })
}

export function firebaseGetMessages({ commit, state }, otherUserId) {
    let userId = state.userDetails.userId
    messagesRef = firebaseDB.ref('chats/' + userId + '/' + otherUserId)
    messagesRef.on('child_added', snapshot => {
        let messageDetails = snapshot.val()
        let messageId = snapshot.key
        commit('addMessage', {
            messageId,
            messageDetails
        })
    })
}
export function firebaseStopGettinhMessages({commit }) {
    if (messagesRef) {
        messagesRef.off('child_added')
        commit('clearMessages')
    }
}
