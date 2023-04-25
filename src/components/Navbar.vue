<template>
  <nav v-if="user" class="navbar">
    <div class="navbar__container">
      <router-link class="navbar__brand" to="/">
        <h3>Beautiful Moments</h3>
      </router-link>

      <template v-if="authIsReady">
        <!-- for logged out users -->
        <ul v-if="!user">
          <li><router-link class="action" to="/login">Login</router-link></li>
          <li><router-link class="action" to="/signup">Signup</router-link></li>
        </ul>
        
        <!-- for logged in users -->
        <div v-if="user" class="navbar__avatar">
          <img :src="user.photoURL" :alt="user.displayName">
          <h4>{{ user.displayName }}</h4>
        </div>
        <ul v-if="user">
          <li><a href="javascript:void(0)" class="action logout" @click="handleLogout">Logout</a></li>
          <li>
            <router-link to="/create">
              <img class="add" src="../assets/add.png" alt="add a new moment" />
            </router-link>
          </li>
        </ul>
      </template>
      
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const store = useStore()
    const router = useRouter()

    const handleLogout = () => {
      store.dispatch('logout')
      router.push('/login')
    }

    return {
      handleLogout,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady)
    }
  }
}
</script>

<style scoped>
  .navbar__container {
    height: 10vh;
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .navbar {
    background: #fff;
    border-bottom: 1px solid #0C1E45;
  }
  .navbar__brand {
    text-decoration: none;
    color: #0C1E45;
    flex: 1;
  }
  .navbar__brand h3 {
    font-size: 1.5rem;
  }
  .navbar ul {
    list-style:none;
    display: flex;
    align-items: center;
  }
  .navbar li {
    list-style:none;
  }
  .navbar li a {
    text-decoration: none;
    color: #0C1E45;
    font-weight: 500;
  }
  .action {
    display: inline-block;
    padding: 10px 30px;
    border-radius: 50px;
    margin-left: 15px;
    background: #fff;
    color: #0C1E45;
    border: 1px solid #0C1E45;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
  }
  .action.logout {
    background: #0C1E45;
    color: #fff;
    border: 1px solid #0C1E45;
  }
  .navbar__avatar {
    display: flex;
    align-items: center;
  }
  .navbar__avatar h4 {
    color: #ABAFB5;
    text-transform: uppercase;
  }
  .navbar__avatar img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  .add {
    width: 20px;
    margin-left: 20px;
  }
  @media(max-width: 512px) {
    .action {
      padding: 7px 20px;
    }
  }
</style>