<template>

   <div class="container mt-5 pt-5">
        <div class="d-flex justify-content align-items-center mb-4">
            <button @click="$router.push('/')" class="btn btn-outline-primary me-5">
                <i class="bi bi-arrow-left"></i> Back to Home
            </button>
            <h2 class="text-center text-primary ms-5 ps-5">Famous Directors & Their Movies</h2>
        </div>

        <div class="container mt-5 shadow-primary p-4 rounded">
            <div class="row border rounded shadow-primary p-3 m-3" v-for="item in directors">
            <div class="col-md-4 fw-bold text-primary">
                {{ item.director }}
            </div>
            <div class="col-md-8">
                <ul>
                <li>{{ item.movies.join(', ') }}</li>
                </ul>
            </div>
            </div>

        </div>

        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary" @click="prevPage" :disabled="page === 1">
                <i class="bi bi-arrow-left-circle me-2"></i>  Previous</button>
            <button class="btn btn-primary" @click="nextPage" :disabled="!hasMorePages">
                Next <i class="bi bi-arrow-right-circle me-2"></i> </button>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted,watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const directors = ref([])
const page = ref(1)
const hasMorePages = ref(true)

const fetchDirectors = async () => {
    console.log("request sending")
  const response = await fetch(`http://localhost:3000/movies/directors?page=${page.value}`)
  console.log("data fetched")
  const data = await response.json()
  directors.value = data
  console.log(directors)

  hasMorePages.value = data.length > 9
}

const nextPage = () => {
  page.value++
  fetchDirectors()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchDirectors()
  }
}


onMounted(fetchDirectors)

watch(page, async () => {
  await fetchDirectors()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>


<style>
.shadow-primary {
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.4); /* Bootstrap primary blue */
}
</style>
