<template>
  <div>

    <nav class="navbar navbar-expand-lg bg-primary fixed-top">
      <div class="container-fluid">

        <a class="navbar-brand text-white" href="#">MovieDB</a>

        <div class="collapse navbar-collapse justify-content-start ms-5">
          <ul class="navbar-nav gap-5">
            <li class="nav-item">
              <a class="nav-link text-white nav-hover" href="#">Famous Directors</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white nav-hover" href="#">Famous Actors</a>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center ms-3 me-auto">
          <input
            class="form-control me-2 search-input"
            type="search"
            placeholder="Search movies..."
            v-model="searchQuery"
            @input="filterMovies"
          />
          <button class="btn btn-light me-4" type="button">
            <i class="bi bi-search text-primary"></i>
          </button>
        </div>

        <div class="d-flex align-items-center ms-3 me-4">
          <i class="bi bi-person-circle text-white fs-2" style="cursor: pointer;"></i>
        </div>
      </div>
    </nav>

   
    <div class="container mt-5 pt-5">
      <div class="row row-cols-1 row-cols-md-5 g-4">
        <div v-for="movie in movies" :key="movie.id" class="col">
          <div class="card h-100" @click="goToMovie(movie.id)" style="cursor: pointer">
            <img :src="movie.poster" class="card-img-top" alt="Movie Image" />
            <div class="card-body">
              <h5 class="card-title movie-title">{{ movie.title }}</h5>
              <p class="card-text director-name">Director: {{ movie.directors[0] }}</p>
              <p class="card-text">Year: {{ movie.year }}</p>
              <p class="card-text">Rating: ⭐ {{ movie.imdb.rating }}</p>
              <a href="#" class="btn btn-primary">View Full</a>
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


    <footer class="bg-primary text-light text-center mt-5 p-4 ">
      <p>&copy; 2025 MovieDB. All rights reserved.</p>
      <p>Contact us at support@moviedb.com | Privacy Policy | Terms of Service</p>
    </footer>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'

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

onMounted(fetchMovies)
</script>



<style>
body {
  background-color: white !important;
}
.card img {
  height: 180px;
  object-fit: cover;
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

</style>
