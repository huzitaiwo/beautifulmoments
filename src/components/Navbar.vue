<template>
  <nav class="navbar">
    <div class="navbar__container">
      <router-link class="navbar__brand" to="/">
        <h3>Beautiful Moments</h3>
      </router-link>

      <!-- for logged out users -->
      <ul>
        <li><router-link class="action" to="/login">Login</router-link></li>
        <li><router-link class="action" to="/signup">Signup</router-link></li>
      </ul>

      <!-- for logged in users -->
      <ul>
        <li><a href="javascript:void(0)" class="action logout" @click="handleLogout">Logout</a></li>
        <li><router-link class="action" to="/create">new moment</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
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

    return { handleLogout }
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
  @media(max-width: 512px) {
    .action {
      padding: 7px 20px;
    }
  }
</style>