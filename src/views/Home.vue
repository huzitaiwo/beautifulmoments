<template>
<div class="container">
  <Showcase />
  <div class="moments__grid" v-if="moments">
    <div v-for="moment in moments" :key="moment.id">
      <div class="moments">
          <img :src="moment.thumbnail" alt="moment thumbnail"/>
          <div class="moments__text">
            <div class="moments__text-small">
              <small>{{ moment.createdAt }}</small>
              <!-- <small>{{ moment.updatedAt.slice(0, 10).replace(/-/gi, '/') }}</small> -->
            </div>
            <h2>{{ moment.title }}</h2>
            <p>{{ moment.details.substring(0, 100) + '...' }}</p>
            <button class="moments__button gradient">
              <router-link :to="{ name: 'Moment', params: { id: moment.id } }">
                Read more
              </router-link>
            </button>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { onSnapshot, getDocs, query, where } from "firebase/firestore"; 
import { collectionRef } from '@/firebase/config';
import Showcase from '../components/Showcase'
import { useStore } from 'vuex'


export default {
  name: "Home",
  components: {
    Showcase
  },
  setup() {
    const moments = ref([])
    const error = ref(null)

    const store = useStore()


    const q = query(collectionRef, where("uid", "==", store.state.user.uid))
    
    // onSnapshot(q, snapshot => {
    //   snapshot.docs.forEach(doc => {
    //     moments.value.push({ ...doc.data(), id: doc.id })
    //     console.log(moments.value)
    //   })
    // })

    getDocs(q)
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          moments.value.push({ ...doc.data(), id: doc.id })
        })
      })
      .catch(err => error.value = err.message)

    return { moments, error }
  }
};
</script>
<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
  }
  .moments {
    border: 2px solid #DBDCE0;
    padding: 15px;
    border-radius: 15px;
  }
  .moments__text-small {
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: #DBDCE0;
  }
  .moments h2 {
    margin-top: 15px;
  }
  .moments p {
    color: #DBDCE0;
    padding: 20px 0;
  }
  .moments img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
  }
  .moments__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  .moments__button {
    display: inline-block;
    padding: 12px 30px;
    border-radius: 50px;
    border: none;
    margin-left: 15px;
    background: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
  }
  .moments__button a {
    text-decoration: none;
    color: #0C1E45;
    font-weight: 500;
  }
  .moments__button.gradient {
    background: linear-gradient(90deg, #2093EE 33.78%, #5C23CA 100%);
  }
  .moments__button.gradient a {
    color: #fff;
  }

  @media (max-width: 830px) {
    .moments__grid {
      display: block;
    }
    .moments {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 20px;
      align-items: center;
      gap: 20px;
    }
    .moments h2 {
      margin-top: 0;
    }
    .moments p {
      padding: 10px 0;
    }
    .moments img {
      border-radius: 15px 0 0 15px;
      height: 100%;
    }
  }
  @media (max-width: 750px) {
    .moments {
      display: block;
    }
    .moments h2 {
      margin-top: 15px;
    }
    .moments p {
      padding: 20px 0;
    }
    .moments img {
      border-radius: 15px 15px 0 0;
    }
  }
</style>
