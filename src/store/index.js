import { createStore } from 'vuex'

import { auth, storage } from '@/firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";


const store = createStore({
  state: {
    user: null,
    authIsReady: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('user state changed', state.user)
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    }
  },
  actions: {
    async signup(context, { email, password, displayName, thumbnail }) {
      console.log('signup action')

      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        // upload user thumbnail
        const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
        const uploadTask = uploadBytesResumable(storageRef, thumbnail);

        uploadTask.on(
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL
              })
            });
          }
        );
        context.commit('setUser', res.user)
      } else { 
        throw new Error('could not complete signup')
      }
    },
    async login(context, { email, password }) {
      console.log('login action')

      const res = await signInWithEmailAndPassword(auth, email, password)
      if(res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      console.log('logout action')

      await signOut(auth)
      context.commit('setUser', null)
    }
  }
})

const unsub = onAuthStateChanged(auth, user => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})

export default store