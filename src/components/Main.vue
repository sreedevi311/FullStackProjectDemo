<template>
    <div class="container mt-5 pt-5">
      <div class="row row-cols-1 row-cols-md-5 g-4">
        <div v-for="movie in movies" :key="movie._id" class="col mb-4">
          <div class="card movie-card h-100 shadow-primary" @click="goToMovie(movie._id)" style="cursor: pointer">
            <img :src="movie.poster" class="card-img-top shadow-primary" alt="Movie Image" />
            <div class="card-body">
              <h5 class="card-title movie-title">{{ movie.title }}</h5>
              <p class="card-text director-name">Director: {{ movie.directors[0] }}</p>
              <p class="card-text">Year: {{ movie.year }}</p>
              <p class="card-text">Rating: ⭐ {{ movie.imdb.rating }}</p>
              <a @click.stop="goToMovie(movie._id)" class="btn btn-primary">View Full</a>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="d-flex justify-content-between mt-4 px-4">
      <button class="btn btn-primary w-25" @click="prevPage" :disabled="page === 1">
        <i class="bi bi-arrow-left-circle me-2"></i> Previous
      </button>
      <button class="btn btn-primary w-25" @click="nextPage" :disabled="!hasMorePages">
        Next <i class="bi bi-arrow-right-circle ms-2"></i>
      </button>
    </div>

</template>

<script setup>
import { ref, onMounted,watch } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const movies = ref([])
const page = ref(1)
const hasMorePages = ref(true)

const fetchMovies = async () => {
  const response = await fetch(`http://localhost:3000/movies?page=${page.value}`)
  const data = await response.json()
  movies.value = data

  hasMorePages.value = data.length === 10 || 20
}


const nextPage = () => {
  page.value++
  fetchMovies()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchMovies()
  }
}

const goToMovie = (id) => {
  router.push(`/movies/${id}`)
}

onMounted(fetchMovies)

watch(page, async () => {
  await fetchMovies()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>



<style>
body {
  background-color: white !important;
}
.card img {
  height: 180px;
  object-fit: cover;
}
.movie-card:hover{
  transform: scale(1.04);
}
.btn:hover{
  background-color:white;
  color:blue;
}
.search-input {
  width: 600px;
}
.nav-hover:hover {
  color: rgba(255, 255, 255, 0.7) !important;
}
.movie-title,.director-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;     
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.6em; 
}
.shadow-primary {
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.4); /* Bootstrap primary blue */
}
</style>
