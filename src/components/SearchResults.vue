<template>
  <div class="container mt-4">
    <h3 class="text-primary text-center mb-4">Search Results for "{{ query }}"</h3>

    <div class="row">
      <div
        v-for="movie in results"
        :key="movie._id"
        class="col-md-3 mb-4"
      >
        <div class="card h-100 shadow-primary">
          <img
            :src="movie.poster"
            class="card-img-top"
            style="height: 400px; object-fit: cover"
            :alt="movie.title"
          />
          <div class="card-body">
              <h5 class="card-title text-primary">{{ movie.title }}</h5>
              <div class="card-text h-50">
                <div class="h-25"><strong>Genres:</strong> {{ movie.genres?.join(', ') }}</div><br>
                <div class="h-25"><strong>Cast:</strong> {{ movie.cast?.slice(0, 2).join(', ') }}...</div>
              </div>
            <router-link :to="`/movies/${movie._id}`" class="btn btn-outline-primary btn-sm mt-3">
              View More
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="results.length === 0" class="text-center text-muted">No matching movies found.</div>

    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-primary" @click="prevPage" :disabled="page === 1">
          <i class="bi bi-arrow-left-circle me-2"></i>  Previous</button>
      <button class="btn btn-primary" @click="nextPage" :disabled="!hasMorePages">
          Next <i class="bi bi-arrow-right-circle me-2"></i> </button>
    </div>
  </div>

  <footer class="bg-primary text-light text-center mt-5 p-4 ">
    <p>&copy; 2025 MovieDB. All rights reserved.</p>
    <p>Contact us at support@moviedb.com | Privacy Policy | Terms of Service</p>
  </footer>
</template>

<script setup>
import { ref, onMounted ,watch} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = route.query.q || ''
const results = ref([])
const page = ref(1)
const hasMorePages = ref(true)

async function fetchSearchResults(){
  const res = await fetch(`http://localhost:3000/movies/search?q=${encodeURIComponent(query)}&page=${page.value}`)
  results.value = await res.json()
  hasMorePages.value = results.value.length === 20
}

const nextPage = () => {
  page.value++
  fetchSearchResults()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchSearchResults()
  }
}

onMounted(fetchSearchResults)

watch(page, async () => {
  await fetchSearchResults()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

</script>

<style>
.btn:hover{
  color:white;
  background-color:#0d6efd;
}
.shadow-primary {
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.4); /* Bootstrap primary blue */
}
</style>
