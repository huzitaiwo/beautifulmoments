import { createStore } from 'vuex'

import { auth, storage, firestore, } from '@/firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";


const store = createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('user state changed', state.user)
    }
  },
  actions: {
    async signup(context, { email, password, displayName, thumbnail }) {
      console.log('signup action')

      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        console.log(res.user)
        // upload user thumbnail & displayName
        const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
        const uploadTask = uploadBytesResumable(storageRef, thumbnail);

        uploadTask.on(
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
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
    }
  }
})

export default store