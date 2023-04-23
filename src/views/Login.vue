<template>
  <div class="login">
    <img class="banner__img" src="../assets/banner.jpg" alt="">
    <form class="login__form" @submit.prevent="handleLogin">
      <h2>Welcome back! 👋</h2>
      <p>Keep living the amazing breathtaking moments</p>
      <div v-if="error">
        <Error :error="error" />
      </div>
      <div class="input__field">
        <div class="input__icon">
          <img src="../assets/mail.svg">
        </div>
        <input type="email" v-model="email" placeholder="email" required />
      </div>
      <div class="input__field">
        <div class="input__icon">
          <img src="../assets/password.svg">
        </div>
        <input type="password" v-model="password" placeholder="password" required />
      </div>
      <button class="input__button">login</button>
      <div class="option">
        <p id="option__p"><span></span>or<span></span></p>
        <small id="option__small">You don't have an account? <router-link to="/signup">signup</router-link></small>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Error from '../components/Error.vue'

export default {
  name: 'Login',
  components: {
    Error
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const handleLogin = () => {
      console.log('login function')
    }


    return { email, password, error, handleLogin}
  }
}
</script>

<style>

</style>