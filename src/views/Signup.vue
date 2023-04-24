<template>
  <div class="signup">
    <img class="banner__img" src="../assets/banner.jpg" alt="">
    <form class="signup__form" @submit.prevent="handleSignup">
      <h2>Welcome! 👋</h2>
      <p>Keep living the amazing breathtaking moments...</p>
      <Error v-if="error" :error="error" />
      <div class="input__field">
        <div class="input__icon">
          <img src="../assets/name.svg">
        </div>
        <input type="text" v-model="displayName" placeholder="displayName" required />
      </div>
      <div class="input__field">
        <div class="input__icon">
          <img src="../assets/mail.svg">
        </div>
        <input type="email" v-model="email" placeholder="email" required />
      </div>
      <div class="input__field file__input">
        <label for="file">
          <img src="../assets/thumbnail.png" />
          <span v-if="thumbnailPath">{{ thumbnailPath.name }}</span>
          <span v-else>upload your image</span>
        </label>
        <input @change="handleFileChange" id="file" type="file" ref="thumbnail" placeholder="upload your image" required />
      </div>
      <div class="input__field">
        <div class="input__icon">
          <img src="../assets/password.svg">
        </div>
        <input type="password" v-model="password" placeholder="password" required />
      </div>
      <button class="input__button">signup</button>
      <div class="option">
        <p id="option__p"><span></span>or<span></span></p>
        <small id="option__small">Already have an account? <router-link to="/login">login</router-link></small>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Error from '../components/Error'

export default {
  name: 'Signup',
  components: {
    Error
  },
  setup() {
    const displayName = ref('')
    const email = ref('')
    const thumbnail = ref(null)
    const thumbnailPath = ref(null)
    const thumbnailError = ref(null)
    const password = ref('')
    const error = ref('')

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

    const handleSignup = async () => {
      try {
        await store.dispatch('signup', {
          displayName: displayName.value,
          email: email.value,
          thumbnail: thumbnail.value.files[0],
          password: password.value,
        })
        router.push('/')
      }
      catch(err) {
        error.value = err.message
      }
    }

    return { displayName, email, thumbnail, thumbnailPath, thumbnailError, password, error, handleSignup, handleFileChange }
  }
}
</script>

<style>

</style>