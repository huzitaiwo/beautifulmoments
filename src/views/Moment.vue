<template>
  <div class="container">
    <Showcase />
    <div v-if="moment">
      <div class="moments">
        <img :src="moment.thumbnail" alt="moment thumbnail" />
        <div class="moments__text">
          <div class="moments__text-small">
            <small>{{ moment.createdAt }}</small>
            <!-- <small>{{ moment.updatedAt.slice(0, 10).replace(/-/gi, '/') }}</small> -->
          </div>
          <h2>{{ moment.title }}</h2>
          <p>{{ moment.details }}</p>
          <div class="moments__buttons">
            <button class="moments__button">
              <router-link :to="'/moment/'+ id + '/edit'">
                Edit
              </router-link>
            </button>
            <button @click="handleDelete" class="moments__button delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { doc, deleteDoc } from 'firebase/firestore'
import { firestore } from '../firebase/config'
import getMoment from '../composables/getMoment'
import Showcase from '../components/Showcase.vue'

export default {
  name: 'Moment',
  props: ['id'],
  components: {
    Showcase
  },
  setup(props) {
    const { moment, error, load } = getMoment(props.id)

    load()

    const id = props.id
    const router = useRouter()
    const docRef = doc(firestore, "moments", id)

    const handleDelete = () => {
      deleteDoc(docRef)
        .then(() => {
          router.push('/')
        })
    }

    return { moment, error, handleDelete , id }
  }
}
</script>

<style scoped>
  .moments {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  .moments__button.delete {
    color: #fff;
    background: #E44B46;
    border: #E44B46;
  }
  .moments img {
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  @media (max-width: 1000px) {
    .moments {
      display: block;
    }
    .moments img {
      margin-bottom: 30px;
    }
  }
</style>