<template>
  <div class="container">
    <Showcase />
    <form @submit.prevent="handleSubmit">
      <div class="create">
        <div class="input__field">
          <input type="text" v-model="title" placeholder="Title of Moment" required />
        </div>
        <div class="input__field">
          <textarea placeholder="All about the Moment" v-model="details" required></textarea>
        </div>
        <div class="input__field file__input">
        <label for="file">
          <img src="../assets/thumbnail.png" />
          <span v-if="thumbnailPath">{{ thumbnailPath.name }}</span>
          <span v-else>upload moment thumbnail</span>
        </label>
        <input @change="handleFileChange" id="file" type="file" ref="thumbnail" placeholder="upload your image" required />
      </div>
        <button class="input__button">create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { addDoc, collection } from 'firebase/firestore'
import { storage, firestore, timestamp } from '../firebase/config'
import {
  ref as storage_ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import useMoments from '../composables/useMoments'
import Showcase from '../components/Showcase.vue'


export default {
  name: 'Create',
  components: {
    Showcase
  },
  setup() {
    const title = ref('')
    const details = ref('')
    const thumbnail = ref(null)
    const thumbnailPath = ref(null)
    const thumbnailError = ref(null)
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const handleFileChange = e => {
      thumbnailPath.value = null
      let selected = e.target.files[0]

      if (!selected) {
        thumbnailError.value = 'Please select an image file'
        return
      }
      if (!selected.type.includes('image')) {
        thumbnailError.value = 'Please file must be an image'
        return
      }
      if (selected.size > 1000000) {
        thumbnailError.value = 'Image file size must be less than 1MB'
        return
      }
      
      thumbnailError.value = null
      thumbnailPath.value = selected
    }



    const handleSubmit = async () => {
      const collectionRef = collection(firestore, "moments")

      // upload user thumbnail
      const storageRef = storage_ref(storage, `thumbnails/moments/${thumbnail.name}`);
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);
      
      uploadTask.on(
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // add data to moments collection
            addDoc(collectionRef, {
              title: title.value,
              details: details.value,
              createdAt: timestamp,
              thumbnail: downloadURL,
              uid: store.state.user.uid
            })
          });
        }
      );

      router.push('/')
    }

    return { title, details, thumbnail, thumbnailPath, error, handleFileChange, handleSubmit }
  }
}
</script>

<style>

</style>