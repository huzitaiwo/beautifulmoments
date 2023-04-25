import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {  onSnapshot, doc } from "firebase/firestore"; 
import { firestore } from '@/firebase/config';

const getMoment = id => {
  const moment = ref(null)
  const error = ref(null)    
  
  const store = useStore()
  const router = useRouter()
  
  const docRef = doc(firestore, "moments", id)
  
  const load = async () => {
    try {
      onSnapshot(docRef, doc => {
        moment.value = doc.data()
      })
    } catch(err) {
      error.value = err.message
    }
  }

  return { load, moment, error }
}

export default getMoment