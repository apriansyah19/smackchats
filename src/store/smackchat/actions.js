import { firebaseAuth, firebaseDB } from "boot/firebase";
import { Notify } from 'quasar'
import {
    Loading,
    QSpinnerGears
  } from 'quasar'
import state from "./state";


let messagesRef

export function registerUser({ commit }, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            let userId = firebaseAuth.currentUser.uid
            firebaseDB.ref('users/' + userId).set({
                name: payload.name,
                email: payload.email,
                onLine: true
            })
            Notify.create({
                message: `Register ${ payload.name } Succes`,
                color: 'green-6',
                timeout: 500,
                avatar: 'icons/icon-256x256.png'
              })
        }).catch(error => {
            console.log(error.message);
        })
}

export function loginUser({ commit, state }, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
        Loading.hide()
        Notify.create({
          message: `Login Succes, Welcome ' ${ state.users[response.user.uid].name }`,
          color: 'green-6',
          timeout: 500,
          avatar: 'icons/icon-256x256.png'
        })
        }).catch(error => {
        Loading.hide()
        Notify.create({
          message: 'Username or Password is incorrect',
          color: 'grey-6',
          timeout: 500,
          avatar: 'icons/icon-256x256.png'
        })
      })
}
export function logoutUser() {
    firebaseAuth.signOut()
    Notify.create({
      message: 'Logout Succes',
      type: 'positive',
      timeout: 500,
      avatar: 'icons/icon-256x256.png'
    })
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
export function firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
        messagesRef.off('child_added')
        commit('clearMessages')
    }
}


export function firebaseSendMessage({ state }, payload) {
    firebaseDB.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.messages)

    payload.messages.from = 'them'
    firebaseDB.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.messages) 
}
