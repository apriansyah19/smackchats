import { firebaseAuth, firebaseDB } from "boot/firebase";

export function registerUser({ commit }, payload) {
    console.log('Regis1 ', payload);
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log('response');
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
        console.log('response', response);
    }).catch(error => {
        console.log(error.message);
    })
 }

