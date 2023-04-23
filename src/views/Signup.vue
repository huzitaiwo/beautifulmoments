<template>
  <div class="signup">
    <img class="banner__img" src="../assets/banner.jpg" alt="">
    <form class="signup__form" @submit.prevent="handleSignup">
        <h2>Welcome! 👋</h2>
        <p>Keep living the amazing breathtaking moments...</p>
      <div class="input__field">
        <div class="input__icon">
          <img src="../assets/name.svg">
        </div>
        <input type="text" v-model="fullname" placeholder="fullname" required />
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

export default {
  name: 'Signup',
  setup() {
    const fullname = ref('')
    const email = ref('')
    const password = ref('')
    const error = ref('')

    const handleSignup = () => {
      console.log('signup function')
    }

    return { fullname, email, password, error, handleSignup }
  }
}
</script>

<style>

</style>