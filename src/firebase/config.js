import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore, serverTimestamp, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyByOtxObMWAt4ShraWSiRL39xnZKOadsVY",
  authDomain: "beautifulmoments-31cf0.firebaseapp.com",
  projectId: "beautifulmoments-31cf0",
  storageBucket: "beautifulmoments-31cf0.appspot.com",
  messagingSenderId: "296909184117",
  appId: "1:296909184117:web:301bae8f3c3d18773e2c3c"
};

// initialize firebase
initializeApp(firebaseConfig)

//initialize authentication
const auth = getAuth()
const storage = getStorage()
const firestore = getFirestore()
const timestamp = serverTimestamp()

const collectionRef = collection(firestore, "moments")

export { auth, storage, firestore, timestamp, collectionRef }